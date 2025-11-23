<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>AdoptaDos - Panel de Administración</title>
                <link rel="stylesheet" type="text/css" href="css/styles.css" />
            </head>
            <body>
                <header class="site-header">
                    <div class="site-logo">🐾 Panel Admin - AdoptaDos</div>
            <nav class="site-nav">
                <a href="index.xml">Inicio</a>
                <a href="iniciar_sesion.xml">Iniciar Sesión</a>
                <a href="crear_cuenta.xml">Crear Cuenta</a>
                <a href="contacto.xml">Contacto</a>
                <a href="animales_disponibles.xml">Animales Disponibles</a>
                <a href="perfil_personal.xml">Perfil</a>

                <!-- Separado con clase admin-link -->
                <a href="adopciones.xml" class="admin-link">Registro de adopciones</a>
                <a href="panel_admin.xml" class="admin-link">Panel de Administración</a>
            </nav>
                </header>

                <main class="main-content">
                    <h1 class="page-title">Panel de Administración</h1>

                    <!-- USUARIOS REGISTRADOS -->
                    <section>
                        <h2>Usuarios Registrados</h2>
                        <table id="usuarios-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Apellidos</th>
                                    <th>Email</th>
                                    <th>Teléfono</th>
                                    <th>Dirección</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Usuarios estáticos desde XML -->
                                <xsl:for-each select="/ProtectoraAdoptaDos/Usuarios/Usuario">
                                    <tr>
                                        <td><xsl:value-of select="@id"/></td>
                                        <td><xsl:value-of select="Nombre"/></td>
                                        <td><xsl:value-of select="Apellidos"/></td>
                                        <td><xsl:value-of select="Email"/></td>
                                        <td><xsl:value-of select="Telefono"/></td>
                                        <td><xsl:value-of select="Direccion"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </section>

                    <!-- ANIMALES -->
                    <section>
                        <h2>Animales en el Sistema</h2>
                        <table id="animales-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Especie</th>
                                    <th>Raza</th>
                                    <th>Edad</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Animales estáticos desde XML -->
                                <xsl:for-each select="/ProtectoraAdoptaDos/Animales/Animal">
                                    <tr>
                                        <td><xsl:value-of select="@id"/></td>
                                        <td><xsl:value-of select="Nombre"/></td>
                                        <td><xsl:value-of select="Especie"/></td>
                                        <td><xsl:value-of select="Raza"/></td>
                                        <td><xsl:value-of select="Edad"/></td>
                                        <td><xsl:value-of select="Estado"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </section>

                    <!-- ADOPCIONES -->
                    <section>
                        <h2>Adopciones Registradas</h2>
                        <table id="adopciones-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Fecha</th>
                                    <th>Animal</th>
                                    <th>Especie / Raza</th>
                                    <th>Adoptantes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Adopciones estáticas desde XML -->
                                <xsl:for-each select="/ProtectoraAdoptaDos/Adopciones/Adopcion">
                                    <tr>
                                        <td><xsl:value-of select="position()"/></td>
                                        <td><xsl:value-of select="FechaAdopcion"/></td>
                                        <td>
                                            <xsl:value-of select="/ProtectoraAdoptaDos/Animales/Animal[@id=current()/AnimalRef/@id_animal]/Nombre"/>
                                        </td>
                                        <td>
                                            <xsl:value-of select="/ProtectoraAdoptaDos/Animales/Animal[@id=current()/AnimalRef/@id_animal]/Especie"/>
                                            /
                                            <xsl:value-of select="/ProtectoraAdoptaDos/Animales/Animal[@id=current()/AnimalRef/@id_animal]/Raza"/>
                                        </td>
                                        <td>
                                            <xsl:value-of select="concat(substring-before(ParejaRef/@id_pareja,'-'),' y ',substring-after(ParejaRef/@id_pareja,'-'))"/>
                                        </td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </section>

                    <!-- MENSAJES DE CONTACTO -->
                    <section>
                        <h2>Mensajes de Contacto</h2>
                        <table id="mensajes-table">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Email</th>
                                    <th>Mensaje</th>
                                </tr>
                            </thead>
                            <tbody>
                                <!-- Mensajes estáticos desde XML -->
                                <xsl:for-each select="/ProtectoraAdoptaDos/Mensajes/Mensaje">
                                    <tr>
                                        <td><xsl:value-of select="Nombre"/></td>
                                        <td><xsl:value-of select="Email"/></td>
                                        <td><xsl:value-of select="Contenido"/></td>
                                    </tr>
                                </xsl:for-each>
                            </tbody>
                        </table>
                    </section>
                </main>

                <footer>
                    <p>© <xsl:value-of select="substring('2025',1,4)"/> Protectora AdoptaDos</p>
                </footer>

                <script type="text/javascript" src="js/panel_admin.js"></script>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>
