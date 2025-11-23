<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/">
    <html>
    <head>
        <meta charset="UTF-8"/>
        <title><xsl:value-of select="datos_formulario/titulo"/></title>
        
        <xsl:for-each select="datos_formulario/clases_css/archivo">
            <link rel="stylesheet" type="text/css" href="css/styles.css"/> 
        </xsl:for-each>
    </head>
<body>
        <div class="header">
            <h1><xsl:value-of select="datos_formulario/titulo"/></h1>
        </div>

        <div class="main-container">
            <div class="{datos_formulario/clase_contenedor}">
                <p class="subtitle"><xsl:value-of select="datos_formulario/subtitulo"/></p>

                <form id="registroAnimalForm" class="{datos_formulario/clase_cuerpo}">
                    
                    <h3>Detalles del Animal</h3>
                    
                    <label for="nombre_animal">Nombre:</label>
                    <input type="text" id="nombre_animal" required="true"/>
                    
                    <label for="especie_animal">Especie:</label>
                    <select id="especie_animal" required="true" onchange="mostrarCampoOtro()">
                        <option value="">— Selecciona Especie —</option>
                        <option value="perro">Perro</option>
                        <option value="gato">Gato</option>
                        <option value="conejo">Conejo</option>
                        <option value="otro">Otro (Especificar)</option>
                    </select>

                    <div id="otro_especie_container" style="display:none; margin-top: 10px;">
                        <label for="otra_especie_input">Especifica la especie:</label>
                        <input type="text" id="otra_especie_input" placeholder="Ej: Hámster, Serpiente, etc."/>
                    </div>
                    
                    <label for="raza_animal">Raza:</label>
                    <input type="text" id="raza_animal"/>

                    <label for="edad_animal">Edad (Años):</label>
                    <input type="number" id="edad_animal" min="0" required="true"/>
                    
                    <label for="peso_animal">Peso (kg):</label>
                    <input type="number" id="peso_animal" min="0" step="0.1"/>

                    <label for="altura_animal">Altura (cm):</label>
                    <input type="number" id="altura_animal" min="0"/>

                    <label for="descripcion_animal">Descripción y Cuidados:</label>
                    <textarea id="descripcion_animal" rows="4" required="true"></textarea>

                    <button type="submit" class="submit-button">Registrar Animal</button>
                    
                    <p class="footer-link">
                        <a href="perfil_personal.xml">Volver al Perfil</a>
                    </p>
                </form>
            </div>
        </div>
        
        <xsl:for-each select="datos_formulario/scripts_js/archivo">
            <script src="{.}"></script>
        </xsl:for-each>

    </body>
    </html>
</xsl:template>
</xsl:stylesheet>