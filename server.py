#!/usr/bin/env python3
import http.server
import socketserver
import os

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

PORT = 8000

with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
    print(f"Servidor rodando em http://localhost:{PORT}")
    print("Pressione Ctrl+C para parar")
    httpd.serve_forever()
