import React, { useState, useRef, useEffect } from 'react';
import { useCart } from '../CartContext';
import './ChatBot.css';

const products = [
  { id: 1, name: 'Pro Football Jersey', price: 29.99, category: 'jerseys', keywords: ['football', 'jersey', 'jerseys', 'shirt', 'kit', 'dharka', 'jersey'] },
  { id: 2, name: 'Running Shorts', price: 19.99, category: 'shorts', keywords: ['running', 'shorts', 'short', 'garabasar', 'garawayso'] },
  { id: 3, name: 'Training Tracksuit', price: 59.99, category: 'tracksuits', keywords: ['tracksuit', 'track', 'suit', 'training', 'jogging', 'dhar'] },
  { id: 4, name: 'Sport Sneakers', price: 89.99, category: 'shoes', keywords: ['shoes', 'sneakers', 'shoe', 'boots', 'kabo', 'kabaha', 'sneaker'] },
  { id: 5, name: 'Boxing Gloves', price: 34.99, category: 'equipment', keywords: ['boxing', 'gloves', 'glove', 'punch', 'gacmo', 'qufsi'] },
  { id: 6, name: 'Sport Hoodie', price: 44.99, category: 'hoodies', keywords: ['hoodie', 'hoodies', 'hood', 'sweater', 'jacket', 'hoodie'] },
  { id: 7, name: 'Basketball Jersey', price: 32.99, category: 'jerseys', keywords: ['basketball', 'basket', 'ball', 'jersey', 'nba'] },
  { id: 8, name: 'Gym Shorts', price: 22.99, category: 'shorts', keywords: ['gym', 'shorts', 'workout', 'exercise', 'garabasar'] },
];

const greetWords = ['hello', 'hi', 'hey', 'salaam', 'salam', 'marhaba', 'nawayda', 'howdy', 'sup', 'good morning', 'good evening'];
const buyWords = ['buy', 'want', 'need', 'get', 'order', 'purchase', 'add', 'take', 'give me', 'i want', 'i need', 'gadan', 'iibso', 'ii keen', 'rabaa', 'raabaa'];
const showWords = ['show', 'list', 'see', 'view', 'what', 'have', 'products', 'items', 'catalog', 'available', 'got', 'do you have', 'maxaad', 'alaab', 'waxa'];
const cartWords = ['cart', 'basket', 'bag', 'my order', 'what i have', 'dalab', 'lacagta'];
const checkoutWords = ['checkout', 'pay', 'payment', 'buy now', 'purchase now', 'complete', 'finish', 'bixin', 'lacag'];
const helpWords = ['help', 'how', 'what can', 'options', 'caawin', 'waxa'];
const priceWords = ['price', 'cost', 'how much','qiime', 'lacag'];
const deliveryWords = ['delivery', 'shipping', 'deliver', 'arrive', 'when', 'how long', 'gaarsiin', 'gaadhsiis'];
const paymentWords = ['evc', 'waafi', 'payment method', 'how to pay', 'hab bixin'];

function detectIntent(text) {
  const lower = text.toLowerCase();

  if (greetWords.some(w => lower.includes(w))) return 'greet';
  if (checkoutWords.some(w => lower.includes(w))) return 'checkout';
  if (cartWords.some(w => lower.includes(w))) return 'cart';
  if (priceWords.some(w => lower.includes(w))) return 'price';
  if (deliveryWords.some(w => lower.includes(w))) return 'delivery';
  if (paymentWords.some(w => lower.includes(w))) return 'payment_info';
  if (buyWords.some(w => lower.includes(w))) return 'buy';
  if (showWords.some(w => lower.includes(w))) return 'show';
  if (helpWords.some(w => lower.includes(w))) return 'help';

  // Check if any product keyword mentioned
  for (const product of products) {
    if (product.keywords.some(k => lower.includes(k))) return 'buy';
  }

  return 'unknown';
}

function findProduct(text) {
  const lower = text.toLowerCase();
  for (const product of products) {
    if (product.keywords.some(k => lower.includes(k))) return product;
  }
  return null;
}

function ChatBot() {
  const { addToCart, cartItems } = useCart();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hello! 👋 Welcome to Darajo Sports!\n\nSalaam! Ku soo dhowow Darajo Sports!\n\nI'm your AI shopping assistant. You can talk to me naturally!\n\nExamples:\n💬 'Do you have shoes?'\n💬 'I want to buy a jersey'\n💬 'Show me all products'\n💬 'How much are the tracksuits?'"
    }
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState('idle');
  const [orderPhone, setOrderPhone] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('evc');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const addBotMessage = (text) => {
    setMessages(prev => [...prev, { from: 'bot', text }]);
  };

  const addUserMessage = (text) => {
    setMessages(prev => [...prev, { from: 'user', text }]);
  };

  const handleMessage = async (message) => {
    if (!message.trim()) return;
    const lower = message.toLowerCase().trim();
    addUserMessage(message);
    setInput('');
    setTyping(true);
    await new Promise(r => setTimeout(r, 900));
    setTyping(false);

    // ===== STEP HANDLERS =====
    if (step === 'waiting_payment') {
      if (lower.includes('evc') || lower.includes('hormuud')) {
        setPaymentMethod('evc');
        setStep('waiting_phone');
        addBotMessage('📱 EVC Plus selected!\n\nGreat choice! Please enter your Hormuud phone number:\n(just the numbers, e.g. 612345678)');
      } else if (lower.includes('waafi') || lower.includes('amal')) {
        setPaymentMethod('waafi');
        setStep('waiting_phone');
        addBotMessage('💳 Waafi selected!\n\nPlease enter your Waafi phone number:\n(just the numbers, e.g. 612345678)');
      } else {
        addBotMessage('Please choose your payment method:\n\n📱 Type "evc" for EVC Plus (Hormuud)\n💳 Type "waafi" for Waafi (Amal Bank)');
      }
      return;
    }

    if (step === 'waiting_phone') {
      if (message.replace(/\s/g, '').match(/^\d{7,10}$/)) {
        setOrderPhone(message);
        setStep('waiting_address');
        addBotMessage(`✅ Phone number saved!\n\nNow please enter your delivery address:\n(e.g. Hodan, Mogadishu)`);
      } else {
        addBotMessage('Please enter a valid phone number!\n(numbers only, e.g. 612345678)');
      }
      return;
    }

    if (step === 'waiting_address') {
      setOrderAddress(message);
      setStep('confirm_order');
      const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const cartList = cartItems.map(i => `• ${i.name} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join('\n');
      addBotMessage(`📋 Please confirm your order:\n\n${cartList}\n\n💰 Total: $${total.toFixed(2)}\n📍 Delivery: ${message}\n📞 Phone: +252${orderPhone}\n💳 Payment: ${paymentMethod === 'evc' ? 'EVC Plus' : 'Waafi'}\n\nType "yes" to confirm ✅\nType "no" to cancel ❌`);
      return;
    }

    if (step === 'confirm_order') {
      if (lower === 'yes' || lower === 'confirm' || lower === 'haa' || lower === 'ok' || lower === 'yeah') {
        setStep('idle');
        addBotMessage('⏳ Processing your payment...\nPlease wait a moment...');

        setTimeout(async () => {
          try {
            const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
            const endpoint = paymentMethod === 'evc'
              ? 'http://localhost:5000/api/payment/evc'
              : 'http://localhost:5000/api/payment/waafi';

            const payRes = await fetch(endpoint, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ phone: orderPhone, amount: total, orderID: 'ORD' + Date.now() })
            });
            const payData = await payRes.json();

            if (payData.success) {
              await fetch('http://localhost:5000/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  items: cartItems,
                  totalPrice: total,
                  paymentMethod,
                  phone: orderPhone,
                  address: orderAddress,
                })
              });
              addBotMessage(`🎉 Order Placed Successfully!\n\n✅ Payment confirmed!\n📦 Transaction: ${payData.transactionId}\n🚚 Expected delivery: 1-3 days\n\nThank you for shopping at Darajo Sports! 🏆\n\nIs there anything else I can help you with?`);
            } else {
              addBotMessage('❌ Payment failed. Please try again!\n\nType "checkout" to retry.');
            }
          } catch (err) {
            addBotMessage('❌ Connection error. Please try the checkout page directly at /checkout');
          }
        }, 2000);
        return;
      }

      if (lower === 'no' || lower === 'cancel' || lower === 'maya') {
        setStep('idle');
        addBotMessage('Order cancelled! No problem 😊\n\nYour cart is still saved. Is there anything else I can help you with?');
        return;
      }

      addBotMessage('Please type "yes" to confirm your order or "no" to cancel.');
      return;
    }

    // ===== INTENT HANDLERS =====
    const intent = detectIntent(message);

    if (intent === 'greet') {
      const hour = new Date().getHours();
      const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
      addBotMessage(`${greeting}! 👋 Welcome to Darajo Sports!\n\nHow can I help you today?\n\n💬 Ask me about products\n💬 Tell me what you want to buy\n💬 Ask about prices, delivery or payment`);
      return;
    }

    if (intent === 'show') {
      const found = findProduct(message);
      if (found) {
        addBotMessage(`Yes! We have ${found.name}! 🎉\n\n👕 ${found.name}\n💰 Price: $${found.price}\n\nWould you like to add it to your cart?\nJust say "yes" or "add it"!`);
        setStep('confirm_add');
        // Store found product temporarily
        sessionStorage.setItem('pendingProduct', JSON.stringify(found));
      } else {
        const list = products.map(p => `• ${p.name} — $${p.price}`).join('\n');
        addBotMessage(`Here's everything we have! 🛍️\n\n${list}\n\nJust tell me which one you want and I'll add it to your cart!`);
      }
      return;
    }

    if (intent === 'buy') {
      const found = findProduct(message);
      if (found) {
        addToCart(found);
        addBotMessage(`✅ Added to your cart!\n\n👕 ${found.name}\n💰 $${found.price}\n\nYour cart now has ${cartItems.length + 1} item(s).\n\nWant to keep shopping or checkout?\n💬 'show products' — see more\n💬 'checkout' — pay now`);
      } else {
        const list = products.map(p => `• ${p.name} — $${p.price}`).join('\n');
        addBotMessage(`I'd love to help you buy something! 🛍️\n\nHere's what we have:\n\n${list}\n\nJust tell me which one!\nExample: "I want the football jersey" or "give me shoes"`);
      }
      return;
    }

    if (intent === 'cart') {
      if (cartItems.length === 0) {
        addBotMessage("Your cart is empty! 🛒\n\nLet me help you find something great!\n\nWould you like to:\n💬 'show products' — browse items\n💬 Tell me what sport you play and I'll suggest products!");
      } else {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
        const list = cartItems.map(i => `• ${i.name} x${i.qty} — $${(i.price * i.qty).toFixed(2)}`).join('\n');
        addBotMessage(`🛒 Your Cart:\n\n${list}\n\n💰 Total: $${total.toFixed(2)}\n\nReady to pay? Type "checkout"!`);
      }
      return;
    }

    if (intent === 'checkout') {
      if (cartItems.length === 0) {
        addBotMessage("Your cart is empty! 🛒\n\nAdd some products first!\nTry: 'I want to buy shoes' or 'show me jerseys'");
        return;
      }
      const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
      const list = cartItems.map(i => `• ${i.name} x${i.qty}`).join('\n');
      addBotMessage(`Great! Let's complete your order! 🎉\n\n🛒 Cart:\n${list}\n\n💰 Total: $${total.toFixed(2)}\n\nHow would you like to pay?\n\n📱 Type "evc" — EVC Plus (Hormuud)\n💳 Type "waafi" — Waafi (Amal Bank)`);
      setStep('waiting_payment');
      return;
    }

    if (intent === 'price') {
      const found = findProduct(message);
      if (found) {
        addBotMessage(`💰 ${found.name} costs $${found.price}\n\nWould you like to buy it? Just say "yes" or "add to cart"!`);
      } else {
        const list = products.map(p => `• ${p.name} — $${p.price}`).join('\n');
        addBotMessage(`Here are all our prices:\n\n${list}\n\nAll prices include free delivery! 🚚`);
      }
      return;
    }

    if (intent === 'delivery') {
      addBotMessage('🚚 Delivery Information:\n\n✅ FREE delivery on all orders!\n📍 We deliver across Somalia\n⏰ Mogadishu: 1-3 days\n⏰ Other cities: 2-5 days\n\nWe deliver to:\n• Mogadishu\n• Bosaso\n• Kismayo\n• Hargeisa\n• And more!\n\nAny other questions?');
      return;
    }

    if (intent === 'payment_info') {
      addBotMessage('💳 We accept:\n\n📱 EVC Plus — Hormuud Telecom\n💳 Waafi — Amal Bank\n\nBoth are 100% secure!\n\nWhen you checkout, just enter your phone number and confirm the payment. Super easy! 🚀\n\nReady to buy? Tell me what you want!');
      return;
    }

    if (intent === 'help') {
      addBotMessage("Here's how I can help you! 😊\n\n🛍️ Browse: 'show me products'\n🔍 Search: 'do you have shoes?'\n💰 Price: 'how much is a jersey?'\n🛒 Buy: 'I want to buy shorts'\n💳 Pay: 'checkout'\n🚚 Delivery: 'when will it arrive?'\n\nYou can ask naturally — I understand English and Somali! 🇸🇴");
      return;
    }

    // Smart unknown handler
    const found = findProduct(message);
    if (found) {
      addToCart(found);
      addBotMessage(`I think you're interested in ${found.name}! ✅\n\nI've added it to your cart!\n💰 Price: $${found.price}\n\nWant to checkout? Type "checkout"!`);
      return;
    }

    addBotMessage("I'm not sure I understood that 😅\n\nYou can ask me things like:\n💬 'Do you have football jerseys?'\n💬 'I want to buy shoes'\n💬 'How much are the tracksuits?'\n💬 'Show me all products'\n\nOr type 'help' for more options! 😊");
  };

  // Handle confirm add
  const handleConfirmAdd = async (message) => {
    const lower = message.toLowerCase();
    if (lower === 'yes' || lower === 'ok' || lower === 'sure' || lower === 'add it' || lower === 'haa') {
      const pending = JSON.parse(sessionStorage.getItem('pendingProduct'));
      if (pending) {
        addToCart(pending);
        sessionStorage.removeItem('pendingProduct');
        setStep('idle');
        addBotMessage(`✅ ${pending.name} added to cart!\n\nWant to keep shopping or checkout?\n💬 'show products'\n💬 'checkout'`);
      }
    } else {
      setStep('idle');
      addBotMessage("No problem! Let me know what else you need! 😊");
    }
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      if (step === 'confirm_add') {
        handleConfirmAdd(input);
        setInput('');
      } else {
        handleMessage(input);
      }
    }
  };

  const handleSend = () => {
    if (step === 'confirm_add') {
      handleConfirmAdd(input);
      setInput('');
    } else {
      handleMessage(input);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {open && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <div className="chatbot-avatar">🤖</div>
            <div>
              <h4>Darajo AI Assistant</h4>
              <p className="chatbot-status">● Online - Ready to help!</p>
            </div>
            <button className="chatbot-close" onClick={() => setOpen(false)}>✕</button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.from}`}>
                <p>{msg.text}</p>
              </div>
            ))}
            {typing && (
              <div className="chatbot-msg bot">
                <p>⏳ Typing...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Ask me anything naturally..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={handleKey}
            />
            <button onClick={handleSend}>➤</button>
          </div>
        </div>
      )}

      <button className="chatbot-bubble" onClick={() => setOpen(!open)}>
        {open ? '✕' : '💬'}
        {!open && cartItems.length > 0 && (
          <span className="chatbot-cart-count">{cartItems.length}</span>
        )}
      </button>
    </div>
  );
}

export default ChatBot;