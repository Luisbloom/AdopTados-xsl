<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>

<xsl:template match="/formulario_adopcion">
<html>
    <head>
        <title><xsl:value-of select="titulo"/></title>
        <link rel="stylesheet" type="text/css" href="css/styles.css" />
        <script src="js/logica_adopciones.js" defer="defer"></script> 
    </head>
    <body>
        <main class="form-container">
            <div class="form-header green-bg">
                <span class="emoji">💛</span> 
                <h2><xsl:value-of select="titulo"/></h2>
                <p><xsl:value-of select="subtitulo"/></p>
            </div>

            <form id="adoptionForm" class="form-body">
                
                <div class="section">
                    <h3 class="section-title">
                        <span class="emoji">🔍</span> <xsl:value-of select="secciones/seccion_animal"/>
                    </h3>
                    <label for="animal-select">Selecciona un animal disponible *</label>
                    <select id="animal-select" required="required">
                        <option value="">— Elija —</option>
                        <xsl:for-each select="animales_disponibles/animal">
                            <option value="{@id}">
                                <xsl:value-of select="nombre"/> (<xsl:value-of select="especie"/> / <xsl:value-of select="raza"/>)
                            </option>
                        </xsl:for-each>
                    </select>
                </div>
                
                <div class="section">
                    <h3 class="section-title">
                        <span class="emoji">👥</span> <xsl:value-of select="secciones/seccion_adoptante1"/>
                    </h3>
                    <label for="email1">Email (debe estar registrado) *</label>
                    <input type="email" id="email1" placeholder="ana.garcia@email.com" required="required"/>
                </div>

                <div class="section">
                    <h3 class="section-title">
                        <span class="emoji">👥</span> <xsl:value-of select="secciones/seccion_adoptante2"/>
                    </h3>
                    <label for="email2">Email (debe estar registrado) *</label>
                    <input type="email" id="email2" placeholder="javier.lopez@email.com" required="required"/>
                </div>

                <div class="section">
                    <h3 class="section-title">
                        <span class="emoji">🤝</span> <xsl:value-of select="secciones/seccion_compromisos"/>
                    </h3>
                    <div class="checkbox-group">
                        <input type="checkbox" id="compromiso1" required="required"/>
                        <label for="compromiso1">Confirmamos que el animal tendrá un hogar seguro.</label>
                    </div>
                    <div class="checkbox-group">
                        <input type="checkbox" id="compromiso2" required="required"/>
                        <label for="compromiso2">Aceptamos seguimiento veterinario periódico.</label>
                    </div>
                </div>

                <button type="submit" class="btn btn-submit">
                    <span class="emoji">✅</span> Enviar solicitud
                </button>
            </form>

            <div class="form-footer">
                <a href="{enlaces/volver_inicio/@url}"><xsl:value-of select="enlaces/volver_inicio"/></a>
                <p>¿No estás registrado? <a href="{enlaces/crear_perfil/@url}"><xsl:value-of select="enlaces/crear_perfil"/></a></p>
            </div>
            
        </main>
    </body>
</html>
</xsl:template>
</xsl:stylesheet>