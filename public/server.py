#!/usr/bin/env python3
import http.server, socketserver, threading, time

PORT = 8888
Handler = http.server.SimpleHTTPRequestHandler

class ThreadedHTTPServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    allow_reuse_address = True
    daemon_threads = True

with ThreadedHTTPServer(("", PORT), Handler) as httpd:
    print(f"Serving on port {PORT}")
    httpd.handle_request()
    httpd.handle_request()
    httpd.handle_request()
