<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<c:set var="contextPath" value="${pageContext.request.contextPath}" />
<!DOCTYPE html>
<html>
<head>
    <title>OpalMP3 - Set Password</title>
    
    <!-- ExtJS Theme and Core -->
<!--    <script type="text/javascript" src="js/lib/extjs7/build/classic/theme-material/theme-material.js"></script>
    <link rel="stylesheet" href="js/lib/extjs7/build/classic/theme-material/resources/theme-material-all.css"></link>-->
<!--    <script type="text/javascript" src="js/lib/extjs7/build/classic/theme-neptune/theme-neptune.js"></script>
    <link rel="stylesheet" href="js/lib/extjs7/build/classic/theme-neptune/resources/theme-neptune-all.css"></link>
    <script src="js/lib/extjs7/build/ext-all.js"></script>

     Toolbar and Register Form 
    <script src="js/app/view/common/Toolbar.js"></script>
    <script src="js/app/view/SetPasswordForm.js"></script>-->

    <script type="text/javascript" src="js/lib/extjs7/build/classic/theme-neptune/theme-neptune.js"></script>
    <link rel="stylesheet" href="js/lib/extjs7/build/classic/theme-neptune/resources/theme-neptune-all.css"></link>
    
    <script src="js/lib/extjs7/build/ext-all.js"></script>    
    <script type="text/javascript" src="js/app/setpassword.js"></script>
    <link rel="stylesheet" type="text/css" href="css/style.css"></link>

<!--    <script>
        Ext.application({
            name: 'OpalMp3',
            launch: function () {
                Ext.create('Ext.container.Viewport', {
                    layout: 'fit',
                    items: [
//                        {
//                            xtype: 'opaltoolbar'
//                        },
                        {
                            xtype: 'setpasswordform',
                            flex: 1
                        }
                    ]
                });
            }
        });
    </script>-->
</head>
</html>