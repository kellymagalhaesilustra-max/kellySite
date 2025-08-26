#!/usr/bin/env python3
"""
Servidor local simples para testar o flipbook PDF
Evita problemas de CORS ao servir arquivos localmente
"""

import http.server
import socketserver
import os
import sys
from urllib.parse import urlparse

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Adicionar headers CORS para permitir carregamento de PDFs
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        super().end_headers()
    
    def do_OPTIONS(self):
        # Responder a requisições OPTIONS (preflight)
        self.send_response(200)
        self.end_headers()
    
    def guess_type(self, path):
        # Garantir que PDFs sejam servidos com o tipo MIME correto
        if path.endswith('.pdf'):
            return 'application/pdf'
        return super().guess_type(path)

def main():
    PORT = 8000
    
    # Verificar se a porta está disponível
    try:
        with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor iniciado em http://localhost:{PORT}")
            print(f"📁 Servindo arquivos do diretório: {os.getcwd()}")
            print(f"📄 Para testar o flipbook: http://localhost:{PORT}/flipbook.html")
            print(f"🧪 Para testar PDFs: http://localhost:{PORT}/teste-pdf-simples.html")
            print("\nPressione Ctrl+C para parar o servidor")
            
            httpd.serve_forever()
    except OSError as e:
        if e.errno == 48:  # Porta já em uso
            print(f"❌ Porta {PORT} já está em uso. Tente uma porta diferente:")
            print(f"   python server.py {PORT + 1}")
        else:
            print(f"❌ Erro ao iniciar servidor: {e}")
    except KeyboardInterrupt:
        print("\n👋 Servidor parado pelo usuário")

if __name__ == "__main__":
    main()
