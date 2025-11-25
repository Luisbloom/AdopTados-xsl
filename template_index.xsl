<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />

<xsl:template match="/">
<html>
    <head>
        <title>AdoptaDos - Inicio</title>
        <link rel="stylesheet" type="text/css" href="css/index.css"/>

    </head>
    
    <body>
        
        <header class="site-header">
            <div class="site-logo">
                🐾 AdoptaDos
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
        
        <main>
            
            <xsl:apply-templates select="PortalAdoptaDos/PaginaPrincipal/Hero"/>
            <hr/>
            
            <div class="animal-list-container">
                <h2>🐾 Animales Disponibles</h2>
                <div class="animal-list">
                    <xsl:apply-templates select="PortalAdoptaDos/PaginaPrincipal/AnimalesDestacados/Animal"/>
                </div>
            </div>
            <hr/>
            
            <div class="features-section">
                <xsl:apply-templates select="PortalAdoptaDos/PaginaPrincipal/Caracteristicas/Feature"/>
            </div>

        </main>

        <footer>
            <p>Protectora AdoptaDos. Todos los derechos reservados.</p>
        </footer>
    </body>
</html>
</xsl:template>

<xsl:template match="Hero">
    <div class="hero-box">
        <h2><xsl:value-of select="Titulo"/></h2>
        <p><xsl:value-of select="Subtitulo"/></p>
        <div>
            <a href="crear_cuenta.xml" class="btn btn-primary">
                <xsl:value-of select="BotonCrearCuenta"/>
            </a>

            <a href="iniciar_sesion.xml" class="btn btn-secondary">
                <xsl:value-of select="BotonIniciarSesion"/>
            </a>
        </div>
    </div>
</xsl:template>

<xsl:template match="Animal">
    <div class="animal-card">

        <!-- Imagen fija según el orden de aparición -->
        <xsl:choose>
            <xsl:when test="position() = 1">
                <img src="img/gato1.jpg" alt="Imagen de {Nombre}"/>
            </xsl:when>
            <xsl:when test="position() = 2">
                <img src="img/conejo1.jpg" alt="Imagen de {Nombre}"/>
            </xsl:when>
            <xsl:when test="position() = 3">
                <img src="img/perro5.jpg" alt="Imagen de {Nombre}"/>
            </xsl:when>
        </xsl:choose>

        <div class="card-body">
            <h3><xsl:value-of select="Nombre"/></h3>
            <p><xsl:value-of select="Especie"/></p>
            <p><xsl:value-of select="Descripcion"/></p>
        </div>
    </div>
</xsl:template>

<xsl:template match="Feature">
    <div class="card-feature">
        <span><xsl:value-of select="Titulo"/></span>
        <p><xsl:value-of select="Texto"/></p>
    </div>
</xsl:template>

</xsl:stylesheet>
