<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/">
<html>
<head>
    <title>AdoptaDos - <xsl:value-of select="inicio_sesion/titulo"/></title>
    <link rel="stylesheet" type="text/css" href="css/iniciar_sesion.css" />
    <script src="js/logica_iniciar_sesion.js" defer="defer"></script>
</head>
<body>
    <div class="main-container">
        
        <header class="form-header">
            <div class="header-content">
                <span class="icon">🔒</span>
                <h1><xsl:value-of select="inicio_sesion/titulo"/></h1>
                <p class="subtitle">
                    <span class="icon">🐶</span> 
                    <a href="{/inicio_sesion/enlaces/volver}"><xsl:value-of select="/inicio_sesion/subtitulo"/></a>
                </p>
            </div>
        </header>

        <main class="form-body">
            <form id="loginForm">
                
                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" required="required" autocomplete="email" 
                           placeholder="{/inicio_sesion/placeholders/email}"/>
                </div>

                <div class="form-group">
                    <label for="contrasena">Contraseña *</label>
                    <input type="password" id="contrasena" required="required" autocomplete="current-password"/>
                </div>
                
                <button type="submit" class="submit-button">
                    <span class="icon">➡️</span> Entrar
                </button>
            </form>
            
            <div class="form-footer">
                ¿No tienes cuenta? 
                <a href="{/inicio_sesion/enlaces/registro}">Regístrate aquí</a>
            </div>
            
            <p class="protection-message">
                <span class="icon">👆</span> <xsl:value-of select="/inicio_sesion/mensaje_proteccion"/>
            </p>

        </main>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>