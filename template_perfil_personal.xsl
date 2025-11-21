<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/">
<html>
<head>
    <title>AdoptaDos - <xsl:value-of select="/perfil_usuario/titulo"/></title>
    <link rel="stylesheet" type="text/css" href="css/perfil_personal.css" />
    <script src="js/logica_perfil.js" defer="defer"></script>
</head>
<body>
    <div class="main-container">
        
        <header class="profile-header">
            <h1 class="header-title"><xsl:value-of select="/perfil_usuario/titulo"/></h1>
            <p class="header-info" id="user-info-placeholder">
                </p>
        </header>

        <img id="user-avatar" src="img/conejo1.jpg" alt="Avatar del usuario"/>

        <main class="profile-body">
            
            <div class="section-card">
                <h2>
                    <span class="icon">📄</span> 
                    <xsl:value-of select="/perfil_usuario/secciones/datos_personales"/>
                </h2>
                
                <div id="datos-personales-placeholder" class="data-group">
                    </div>
            </div>

            <div class="section-card">
                <h2>
                    <span class="icon">🐾</span> 
                    <xsl:value-of select="/perfil_usuario/secciones/mis_adopciones"/>
                </h2>
                
                <div id="adopciones-placeholder" class="adoptions-list">
                    <p class="no-adoptions" style="display:none;">No tienes más adopciones registradas.</p>
                </div>
            </div>

            <xsl:apply-templates select="/perfil_usuario/acciones"/>

        </main>
    </div>
</body>
</html>
</xsl:template>

<xsl:template match="acciones">
    <div class="action-buttons-group top-actions">
        <xsl:call-template name="render-button">
            <xsl:with-param name="node" select="enlace_inicio"/>
            <xsl:with-param name="class">btn-green</xsl:with-param>
            <xsl:with-param name="icon">🏡</xsl:with-param>
        </xsl:call-template>
        
        <xsl:call-template name="render-button">
            <xsl:with-param name="node" select="enlace_nueva_adopcion"/>
            <xsl:with-param name="class">btn-blue</xsl:with-param>
            <xsl:with-param name="icon">➕</xsl:with-param>
        </xsl:call-template>

        <xsl:call-template name="render-button">
            <xsl:with-param name="node" select="enlace_registrar_animal"/>
            <xsl:with-param name="class">btn-light-green</xsl:with-param>
            <xsl:with-param name="icon">🐾</xsl:with-param>
        </xsl:call-template>
        
        <xsl:call-template name="render-button">
            <xsl:with-param name="node" select="enlace_editar_perfil"/>
            <xsl:with-param name="class">btn-light-gray</xsl:with-param>
            <xsl:with-param name="icon">⚙️</xsl:with-param>
        </xsl:call-template>
    </div>

    <div class="action-buttons-group bottom-actions">
        <xsl:call-template name="render-button">
            <xsl:with-param name="node" select="enlace_borrar_cuenta"/>
            <xsl:with-param name="class">btn-red</xsl:with-param>
            <xsl:with-param name="id">borrar-cuenta-btn</xsl:with-param>
            <xsl:with-param name="icon">🗑️</xsl:with-param>
        </xsl:call-template>
        
        <xsl:call-template name="render-button">
            <xsl:with-param name="node" select="enlace_cerrar_sesion"/>
            <xsl:with-param name="class">btn-red</xsl:with-param>
            <xsl:with-param name="id">cerrar-sesion-btn</xsl:with-param>
            <xsl:with-param name="icon">❌</xsl:with-param>
        </xsl:call-template>
    </div>
</xsl:template>

<xsl:template name="render-button">
    <xsl:param name="node"/>
    <xsl:param name="class"/>
    <xsl:param name="id"/>
    <xsl:param name="icon"/>

    <a href="{$node/@url}" class="btn {$class}" id="{$id}">
        <xsl:value-of select="$icon"/> <xsl:value-of select="$node"/>
    </a>
</xsl:template>

</xsl:stylesheet>