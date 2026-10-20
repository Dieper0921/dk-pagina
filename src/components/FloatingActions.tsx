import React, { useState } from 'react';
import { ShoppingBag, PhoneCall, X, MessageCircle, User, Phone, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const FloatingActions: React.FC = () => {
  const { storeConfig, cartCount, setIsCartOpen } = useStore();
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = storeConfig.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phoneNumber.trim() || !query.trim()) return;

    const message = `👋 *SOLICITUD DE CONTACTO - ${storeConfig.storeName}*

👤 *Nombres:* ${name.trim()}
📱 *Teléfono:* ${phoneNumber.trim()}
💬 *Consulta u Opinión:*
"${query.trim()}"

_Enviado desde el formulario "Te contactamos" de la tienda online._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhoneNumber('');
      setQuery('');
      setIsContactOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Floating Cart Button (shows if items in cart) */}
      {cartCount > 0 && !isContactOpen && (
        <button
          onClick={() => setIsCartOpen(true)}
          className="pointer-events-auto flex items-center gap-2 px-4 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-full shadow-xl border border-slate-700 transition-all hover:scale-105 active:scale-95"
          aria-label="Abrir carrito de compras"
        >
          <ShoppingBag className="w-4 h-4" />
          <span className="text-xs font-bold tabular-nums">
            {cartCount} {cartCount === 1 ? 'producto' : 'productos'}
          </span>
          <span className="w-2 h-2 rounded-full bg-amber-400" />
        </button>
      )}

      {/* Expanded Floating Box: "Te contactamos" */}
      {isContactOpen && (
        <div className="pointer-events-auto w-[92vw] max-w-sm bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-bold">
                <PhoneCall className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">Te contactamos</h3>
                <p className="text-[11px] text-slate-400">Atención personalizada en Perú</p>
              </div>
            </div>
            <button
              onClick={() => setIsContactOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar formulario de contacto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form Body */}
          <div className="p-4 sm:p-5">
            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">¡Solicitud recibida con éxito!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Gracias <strong>{name}</strong>. Nos comunicaremos contigo al <strong>{phoneNumber}</strong> a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitContact} className="space-y-3.5">
                <p className="text-xs text-slate-600 leading-relaxed">
                  Completa tus datos y nos pondremos en contacto contigo vía WhatsApp o llamada telefónica.
                </p>

                {/* 1. Casilla de Nombres */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Nombres completos *
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ej: Diego Pérez"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                {/* 2. Casilla de Número Telefónico */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Número telefónico *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 987 654 321 o +51..."
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                {/* 3. Casilla de 200 Caracteres para Consulta u Opinión */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-700">
                      Consulta u opinión *
                    </label>
                    <span
                      className={`text-[10px] font-mono tabular-nums ${
                        query.length >= 195
                          ? 'text-rose-600 font-bold'
                          : query.length >= 160
                          ? 'text-amber-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {query.length} / 200 caracteres
                    </span>
                  </div>
                  <textarea
                    required
                    maxLength={200}
                    rows={3}
                    placeholder="Escribe tu consulta sobre productos importados, cotizaciones o envíos..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Enviar Consulta por WhatsApp</span>
                </button>

                <div className="text-[10px] text-center text-slate-400">
                  Respuesta inmediata · WhatsApp Oficial: {storeConfig.whatsappNumber}
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button: "Te contactamos" */}
      <button
        onClick={() => setIsContactOpen(!isContactOpen)}
        className="pointer-events-auto flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group font-bold text-xs"
        aria-label="Desplegar formulario Te contactamos"
      >
        <PhoneCall className="w-4 h-4 animate-bounce" />
        <span>Te contactamos</span>
      </button>
    </div>
  );
};
