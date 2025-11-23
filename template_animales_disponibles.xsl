<?xml version="1.0" encoding="UTF-8"?>

<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="html" indent="yes" encoding="UTF-8"/>

    <!-- PLANTILLA PRINCIPAL -->
    <xsl:template match="/ProtectoraAdoptaDos">
        <html>
            <head>
                <title>Animales Disponibles</title>
                <link rel="stylesheet" type="text/css" href="css/styles.css"/>
                <script src="js/animales_disponibles.js"></script>
            </head>

            <body>

                <!-- HEADER -->
                <header class="site-header">
                    <div class="site-logo">
                        🐾 Animales Disponibles
                    </div>

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
                    <h1 class="page-title">Animales Disponibles</h1>

                    <div id="animal-list" class="animal-list">
                        <xsl:apply-templates select="Animales/Animal"/>
                    </div>
                </main>

            </body>
        </html>
    </xsl:template>

    <!-- PLANTILLA DE TARJETA -->
    <xsl:template match="Animal">
        <div class="animal-card">
            <div class="card-body">
                <h3><xsl:value-of select="Nombre"/></h3>
                <p><strong>Especie:</strong> <xsl:value-of select="Especie"/></p>
                <p><strong>Raza:</strong> <xsl:value-of select="Raza"/></p>
                <p><strong>Edad:</strong> <xsl:value-of select="Edad"/> años</p>
                <p><strong>ID:</strong> <xsl:value-of select="@id"/></p>
            </div>

        </div>
    </xsl:template>

</xsl:stylesheet>
