<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:variable name="root" select="/ProtectoraAdoptaDos"/>

<xsl:template match="/">
<html>
    <head>
        <title>AdoptaDos - Registro de Adopciones</title>
        <link rel="stylesheet" type="text/css" href="css/adopciones.css" />
    </head>
    <body>
        
        <header class="site-header">
            <div class="site-logo">
                🐾 Portal AdoptaDos <span>Adopta un animal... ¡en pareja!</span>
            </div>
            <nav class="site-nav">
                <a href="index.xml">Inicio</a> 
                <a href="iniciar_sesion.xml">Iniciar Sesión</a>
                <a href="#">Animales en Adopción</a>
                <a href="#">Contacto</a>
                <a href="crear_cuenta.xml" class="btn-register">Regístrate</a>
            </nav>
        </header>

        <main class="main-content">
            <h1 class="page-title">Registro de Adopciones de la Protectora</h1>
            
            <div class="table-container">
                <h2 class="section-title">Detalle de Adopciones Registradas</h2>
                
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Fecha Adopción</th>
                            <th>Animal Adoptado</th>
                            <th>Especie / Raza</th>
                            <th>Adoptantes (Pareja)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="$root/Adopciones/Adopcion">
                            <xsl:variable name="animalID" select="AnimalRef/@id_animal"/>
                            <xsl:variable name="parejaID" select="ParejaRef/@id_pareja"/>
                            
                            <xsl:variable name="animal" select="$root/Animales/Animal[@id = $animalID]"/>
                            <xsl:variable name="pareja" select="$root/Parejas/Pareja[@id = $parejaID]"/>
                            
                            <tr>
                                <td><xsl:value-of select="@id"/></td> 
                                
                                <td><xsl:value-of select="FechaAdopcion"/></td>
                                
                                <td><xsl:value-of select="$animal/Nombre"/></td>
                                
                                <td><xsl:value-of select="$animal/Especie"/> / <xsl:value-of select="$animal/Raza"/></td>
                                
                                <td>
                                    <xsl:value-of select="$pareja/Persona1/Nombre"/> y <xsl:value-of select="$pareja/Persona2/Nombre"/>
                                </td>
                            </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </div>

            <div class="actions">
                <a href="index.xml" class="btn btn-primary">Volver a Inicio</a>
                <a href="#" class="btn btn-secondary">Añadir Nueva Adopción</a>
            </div>
            
        </main>

        <footer>
            <p>© <xsl:value-of select="substring('2025', 1, 4)"/> Protectora AdoptaDos. Todos los derechos reservados.</p>
        </footer>
    </body>
</html>
</xsl:template>
</xsl:stylesheet>