<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

<xsl:output method="html" encoding="UTF-8" indent="yes"/>

<xsl:template match="/ContactoPage">

<html>
<head>
    <meta charset="UTF-8"/>
    <title><xsl:value-of select="DatosContacto/Titulo"/></title>

    <!-- Carga del CSS externo -->
    <link rel="stylesheet" type="text/css" href="css/styles.css"/>
</head>

<body>

    <!-- ========================================= -->
    <!--                 NAVBAR                    -->
    <!-- ========================================= -->
    <div class="site-header">
        <div class="site-logo">
            <span>🐾 AdoptaDos</span>
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
    </div>

    <div class="container">

        <h1><xsl:value-of select="DatosContacto/Titulo"/></h1>
        <p><xsl:value-of select="DatosContacto/Descripcion"/></p>

        <form id="contactForm">

            <!-- Render dinámico de los campos -->
            <xsl:for-each select="Formulario/Campo">
                <label for="{@id}">
                    <xsl:value-of select="@etiqueta"/>
                </label>

                <xsl:choose>
                    <xsl:when test="@tipo='textarea'">
                        <textarea id="{@id}" required="required"></textarea>
                    </xsl:when>
                    <xsl:otherwise>
                        <input id="{@id}" type="text" required="required"/>
                    </xsl:otherwise>
                </xsl:choose>
            </xsl:for-each>

            <button type="submit">Enviar</button>
        </form>

        <p id="estado"></p>
    </div>

    <!-- Carga del JavaScript externo -->
    <script src="js/contacto.js"></script>
</body>
</html>

</xsl:template>

</xsl:stylesheet>
