<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/">
<html>
<head>
    <title><xsl:value-of select="registro_usuario/titulo"/></title>
    <link rel="stylesheet" type="text/css" href="css/crear_cuenta.css" />
    <script src="js/logica_crear_cuenta.js" defer="defer"></script>
</head>
<body>
    <div class="main-container">
        
        <header class="form-header">
            <div class="header-content">
                <span class="icon">👤</span>
                <h1><xsl:value-of select="registro_usuario/titulo"/></h1>
                <p class="subtitle">
                    <span class="icon">🐶</span> 
                    <a href="{/registro_usuario/enlaces/enlace[1]/@url}"><xsl:value-of select="/registro_usuario/subtitulo"/></a>
                </p>
            </div>
        </header>

        <main class="form-body">
            <form id="registroForm">
                
                <div class="form-group">
                    <label for="nombre">Nombre *</label>
                    <input type="text" id="nombre" required="required" autocomplete="given-name"/>
                </div>
                
                <div class="form-group">
                    <label for="apellidos">Apellidos *</label>
                    <input type="text" id="apellidos" required="required" autocomplete="family-name"/>
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" required="required" autocomplete="email"/>
                </div>

                <div class="form-group">
                    <label for="telefono">Teléfono *</label>
                    <input type="tel" id="telefono" required="required" placeholder="Ej: 600123456" autocomplete="tel"/>
                </div>

                <div class="form-group">
                    <label for="direccion">Dirección completa *</label>
                    <textarea id="direccion" rows="3" required="required" autocomplete="street-address"></textarea>
                </div>
                
                <div class="form-group">
                    <label for="contrasena">Contraseña *</label>
                    <input type="password" id="contrasena" required="required" minlength="6" autocomplete="new-password"/>
                    <small>Debe tener al menos 6 caracteres.</small>
                </div>

                <div class="form-group">
                    <label for="repetirContrasena">Repetir contraseña *</label>
                    <input type="password" id="repetirContrasena" required="required" autocomplete="new-password"/>
                </div>

                <div class="form-group agreement-group">
                    <input type="checkbox" id="aceptoPolitica" required="required"/>
                    <label for="aceptoPolitica" class="inline-label">Acepto
                        <a href="{/registro_usuario/enlaces/enlace[2]/@url}">política de privacidad</a> *
                    </label>
                </div>

                <button type="submit" class="submit-button">
                    <span class="icon">✔</span> Crear mi perfil
                </button>
            </form>
            
            <div class="form-footer">
                ¿Ya tienes cuenta? 
                <a href="{/registro_usuario/enlaces/enlace[3]/@url}">Inicia sesión</a>
            </div>

        </main>
    </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>