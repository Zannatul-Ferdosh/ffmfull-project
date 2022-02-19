
import Head from "next/head";

import "bootstrap/dist/css/bootstrap.css";

import Menu from "../components/Menu";

import '../css/dark.css';
export default ({ children }) => {
  return(
    <>

      <Head>
       
        <meta charset="utf-8" />
		<title>Field Force Management </title>
		<meta name="description" content="Page with empty content"/>
		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"/>	
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700|Roboto:300,400,500,600,700"/>
		<link href="/static/assets/template/dist/assets/css/pages/wizard/wizard-4.css" rel="stylesheet" type="text/css" />
		<link href="/static/assets/template/dist/assets/plugins/custom/fullcalendar/fullcalendar.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/static/assets/template/dist/assets/plugins/custom/datatables/datatables.bundle.css" rel="stylesheet" type="text/css" />
        <link href="/static/assets/template/dist/assets/plugins/global/plugins.bundle.css" rel="stylesheet" type="text/css" />
		<link href="/static/assets/template/dist/assets/css/style.bundle.css" rel="stylesheet" type="text/css" />	
		<link href="/static/assets/template/dist/assets/css/skins/header/base/light.css" rel="stylesheet" type="text/css" />
		<link href="/static/assets/template/dist/assets/css/skins/header/menu/light.css" rel="stylesheet" type="text/css" />
		<link href="/static/assets/template/dist/assets/css/skins/brand/dark.css" rel="stylesheet" type="text/css" />
		<link href="/static/assets/template/dist/assets/css/skins/aside/dark.css" rel="stylesheet" type="text/css" />
		<link
				href="https://api.mapbox.com/mapbox-gl-js/v0.51.0/mapbox-gl.css"
				rel="stylesheet"
				/>
	
		<link rel="shortcut icon" href="/static/assets/template/dist/assets/media/logos/favicon.ico" />
      </Head>
	  <body className="kt-quick-panel--right kt-demo-panel--right kt-offcanvas-panel--right kt-header--fixed kt-header-mobile--fixed kt-subheader--enabled kt-subheader--transparent kt-aside--enabled kt-aside--fixed kt-page--loading">

    <Menu>

		{children}
	</Menu>
		<script src="/static/assets/template/dist/assets/plugins/global/plugins.bundle.js" type="text/javascript"></script>
		<script src="/static/assets/template/dist/assets/js/scripts.bundle.js" type="text/javascript"></script>

		<script src="/static/assets/template/dist/assets/plugins/custom/datatables/datatables.bundle.js" type="text/javascript"></script>
		<script src="/static/assets/template/dist/assets/js/pages/crud/datatables/basic/basic.js" type="text/javascript"></script>

		<script src="/static/assets/template/dist/assets/plugins/custom/fullcalendar/fullcalendar.bundle.js" type="text/javascript"></script>
		<script src="//maps.google.com/maps/api/js?key=AIzaSyBTGnKT7dt597vo9QgeQ7BFhvSRP4eiMSM" type="text/javascript"></script>
		<script src="/static/assets/template/dist/assets/plugins/custom/gmaps/gmaps.js" type="text/javascript"></script>

		<script src="/static/assets/template/dist/assets/js/pages/dashboard.js" type="text/javascript"></script>
		<script src="//cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
	</body>
    </>
  );
};