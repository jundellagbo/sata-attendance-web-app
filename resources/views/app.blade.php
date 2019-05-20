<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Attendance Application</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no">
        <link rel="shortcut icon" href="{{ asset('favicon.ico') }}" >
        <style>
            body {
                margin: 0;
            }
        </style>
    </head>
    <body>
        <div id="app"></div>
        <script src="{{ mix('js/app.js') }}"></script>
    </body>
</html>
