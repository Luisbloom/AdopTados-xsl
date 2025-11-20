<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" doctype-system="about:legacy-compat" encoding="UTF-8" indent="yes" />

<xsl:template match="/">
<html>
    <head>
        <title>AdoptaDos - Inicio</title>
        <link rel="stylesheet" type="text/css" href="index.css" /> 
    </head>
    
    <body>
        
        <header class="site-header">
            <div class="site-logo">
                🐾 Portal AdoptaDos <span>Adopta un animal... ¡en pareja!</span>
            </div>
            <nav class="site-nav">
                <a href="adopciones.xml">Registro</a> 
                <a href="#">Iniciar Sesión</a>
                <a href="#">Animales</a>
                <a href="#">Contacto</a>
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
            <a href="#" class="btn btn-primary"><xsl:value-of select="BotonCrearCuenta"/></a>
            <a href="#" class="btn btn-secondary"><xsl:value-of select="BotonIniciarSesion"/></a>
        </div>
    </div>
</xsl:template>

<xsl:template match="Animal">
    <div class="animal-card">
        <img src="{ImagenUrl}" alt="Imagen de {Nombre}"/>
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