<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
<xsl:output method="html" indent="yes" encoding="UTF-8"/>
    
<xsl:template match="/">
<html>
    <head>
        <title>AdoptaDos - Registro de Adopciones</title>
        <link rel="stylesheet" type="text/css" href="adopciones.css" />
    </head>
    <body>
        
        <header class="site-header">
            <div class="site-logo">
                🐾 Portal AdoptaDos <span>Adopta un animal... ¡en pareja!</span>
            </div>
            <nav class="site-nav">
                <a href="index.xml">Inicio</a> 
                <a href="#">Iniciar Sesión</a>
                <a href="#">Animales</a>
                <a href="#">Contacto</a>
            </nav>
        </header>

        <main>
            <h1>Registro de la Protectora AdoptaDos</h1>
            
            <h2>Registro de Adopciones</h2>
            <table>
                <tr>
                    <th>Fecha Adopción</th>
                    <th>Animal Adoptado</th>
                    <th>Adoptado por (Pareja)</th>
                </tr>
                <xsl:for-each select="/ProtectoraAdoptaDos/Adopciones/Adopcion">
                    <xsl:variable name="animalID" select="AnimalRef/@id_animal"/>
                    <xsl:variable name="parejaID" select="ParejaRef/@id_pareja"/>
                    
                    <xsl:variable name="nombreAnimal" select="/ProtectoraAdoptaDos/Animales/Animal[@id = $animalID]/Nombre"/>
                    <xsl:variable name="parejaP1" select="/ProtectoraAdoptaDos/Parejas/Pareja[@id = $parejaID]/Persona1/Nombre"/>
                    <xsl:variable name="parejaP2" select="/ProtectoraAdoptaDos/Parejas/Pareja[@id = $parejaID]/Persona2/Nombre"/>
                    
                    <tr>
                        <td><xsl:value-of select="FechaAdopcion"/></td>
                        <td><xsl:value-of select="$nombreAnimal"/></td>
                        <td><xsl:value-of select="$parejaP1"/> y <xsl:value-of select="$parejaP2"/></td>
                    </tr>
                </xsl:for-each>
            </table>
            
        </main>

        <footer>
            <p>Protectora AdoptaDos. Todos los derechos reservados.</p>
        </footer>
    </body>
</html>
</xsl:template>
</xsl:stylesheet>