<!DOCTYPE html>
<!--[if IE 9]><html class="ie9" lang="en" ><![endif]-->
<!--[if IE 8]><html class="no-js lt-ie9" lang="en" ><![endif]-->
<!--[if gt IE 9]><!--><html class="no-js" lang="en" ><!--<![endif]-->
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta name="csrf-token" content="{{ csrf_token() }}">

		{{-- faviconit.com favicons --}}
		<link rel="shortcut icon" href="{{ HTML::asset('images/faviconit/favicon.ico') }}">
		<link rel="icon" sizes="16x16 32x32 64x64" href="{{ HTML::asset('images/faviconit/favicon.ico') }}">
		<link rel="icon" type="image/png" sizes="196x196" href="{{ HTML::asset('images/faviconit/favicon-196.png') }}">
		<link rel="icon" type="image/png" sizes="160x160" href="{{ HTML::asset('images/faviconit/favicon-160.png') }}">
		<link rel="icon" type="image/png" sizes="96x96" href="{{ HTML::asset('images/faviconit/favicon-96.png') }}">
		<link rel="icon" type="image/png" sizes="64x64" href="{{ HTML::asset('images/faviconit/favicon-64.png') }}">
		<link rel="icon" type="image/png" sizes="32x32" href="{{ HTML::asset('images/faviconit/favicon-32.png') }}">
		<link rel="icon" type="image/png" sizes="16x16" href="{{ HTML::asset('images/faviconit/favicon-16.png') }}">
		<link rel="apple-touch-icon" sizes="152x152" href="{{ HTML::asset('images/faviconit/favicon-152.png') }}">
		<link rel="apple-touch-icon" sizes="144x144" href="{{ HTML::asset('images/faviconit/favicon-144.png') }}">
		<link rel="apple-touch-icon" sizes="120x120" href="{{ HTML::asset('images/faviconit/favicon-120.png') }}">
		<link rel="apple-touch-icon" sizes="114x114" href="{{ HTML::asset('images/faviconit/favicon-114.png') }}">
		<link rel="apple-touch-icon" sizes="76x76" href="{{ HTML::asset('images/faviconit/favicon-76.png') }}">
		<link rel="apple-touch-icon" sizes="72x72" href="{{ HTML::asset('images/faviconit/favicon-72.png') }}">
		<link rel="apple-touch-icon" href="{{ HTML::asset('images/faviconit/favicon-57.png') }}">
		<meta name="msapplication-TileColor" content="#FFFFFF">
		<meta name="msapplication-TileImage" content="{{ HTML::asset('images/faviconit/favicon-144.png') }}">
		<meta name="msapplication-config" content="{{ HTML::asset('images/faviconit/browserconfig.xml') }}">
		{{-- faviconit.com favicons --}}

		<title>{{ $page_title or 'Application' }}</title>

		@yield('css')
		<link rel="stylesheet" href="{{ HTML::asset('css/app.css') }}" data-norem />
		<!--[if IE 8]><link rel="stylesheet" href="{{ HTML::asset('css/ie8.css')  }}" data-norem /><![endif]-->

		<script src="{{ HTML::asset('js/modernizr.min.js') }}"></script>
		<!--[if IE 8]><script src="{{ HTML::asset('js/legacy.min.js') }}"></script><![endif]-->
		@yield('js_top')
	</head>
	<body>

		@yield('main', 'Innovative Core')

		<!--[if IE 8]>
			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
			<script>window.jQuery || document.write('<script src="{{ HTML::asset('js/vendor/jquery-legacy.min.js') }}"><\/script>')</script>
			<script src="{{ HTML::asset('js/rem.min.js') }}"></script>
		<![endif]-->
		<!--[if gt IE 8]><!-->
			<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js"></script>
			<script>window.jQuery || document.write('<script src="{{ HTML::asset('js/vendor/jquery.min.js') }}"><\/script>')</script>
		<!--<![endif]-->
		<script type="text/javascript" src="{{ HTML::asset('js/app.min.js') }}"></script>
	</body>
</html>
