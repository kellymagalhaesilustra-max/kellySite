# 📧 Configuração da Newsletter - EmailJS

## 🚀 Como Configurar o EmailJS

### 1. Criar Conta no EmailJS
1. Acesse [emailjs.com](https://www.emailjs.com/)
2. Crie uma conta gratuita
3. Faça login no painel

### 2. Configurar Serviço de E-mail
1. No painel do EmailJS, vá em "Email Services"
2. Clique em "Add New Service"
3. Escolha "Gmail" ou "Outlook"
4. Conecte sua conta de e-mail (kellymagalhaesilustra@gmail.com)
5. Anote o **Service ID** gerado

### 3. Criar Template de E-mail
1. Vá em "Email Templates"
2. Clique em "Create New Template"
3. Configure o template:

**Assunto:**
```
Nova inscrição na Newsletter - Kelly Magalhães
```

**Conteúdo:**
```html
<h2>Nova Inscrição na Newsletter</h2>
<p><strong>E-mail:</strong> {{from_email}}</p>
<p><strong>Data:</strong> {{date}}</p>
<p><strong>Hora:</strong> {{time}}</p>
<hr>
<p>Esta pessoa se inscreveu na newsletter do site Kelly Magalhães.</p>
```

4. Anote o **Template ID** gerado

### 4. Obter Chave Pública
1. Vá em "Account" → "API Keys"
2. Copie a **Public Key**

### 5. Atualizar o Código
No arquivo `flipbook.html`, substitua:

```javascript
// Linha 1: Substitua YOUR_PUBLIC_KEY
emailjs.init("SUA_CHAVE_PUBLICA_AQUI");

// Linha 2: Substitua YOUR_SERVICE_ID
emailjs.send('SEU_SERVICE_ID_AQUI', 'SEU_TEMPLATE_ID_AQUI', templateParams)
```

### 6. Exemplo de Configuração Final
```javascript
// Configuração do EmailJS
(function() {
  emailjs.init("user_abc123def456"); // Sua chave pública
})();

// No envio do e-mail
emailjs.send('service_xyz789', 'template_newsletter', templateParams)
```

## ✅ Funcionalidades Implementadas

- ✅ **Validação de e-mail** antes do envio
- ✅ **Botão desabilitado** durante o envio
- ✅ **Mensagem de sucesso** "Obrigado!" após inscrição
- ✅ **E-mail automático** para kellymagalhaesilustra@gmail.com
- ✅ **Mensagem de erro** se algo der errado
- ✅ **Limpeza do campo** após sucesso
- ✅ **Auto-hide** da mensagem após 5 segundos

## 🎯 Como Funciona

1. Usuário digita e-mail e clica "Inscrever"
2. Sistema valida o e-mail
3. Botão fica "Enviando..." e desabilitado
4. E-mail é enviado para Kelly automaticamente
5. Mensagem "Obrigado!" aparece em verde
6. Campo é limpo
7. Após 5 segundos, mensagem desaparece

## 📧 Informações do E-mail Enviado

O e-mail para Kelly conterá:
- E-mail do inscrito
- Data e hora da inscrição
- Assunto: "Nova inscrição na Newsletter - Kelly Magalhães"

## 🔧 Troubleshooting

**Problema:** E-mail não é enviado
**Solução:** Verificar se as chaves do EmailJS estão corretas

**Problema:** Mensagem de erro aparece
**Solução:** Verificar conexão com internet e configuração do EmailJS

**Problema:** Template não funciona
**Solução:** Verificar se o template foi criado corretamente no EmailJS

