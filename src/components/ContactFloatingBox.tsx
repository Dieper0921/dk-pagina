import React, { useState } from 'react';
import { PhoneCall, X, Send, CheckCircle2, MessageCircle, User, Phone, MessageSquare } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ContactFloatingBox: React.FC = () => {
  const { storeConfig } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const cleanPhone = storeConfig.whatsappNumber.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !query.trim()) return;

    // Build formatted WhatsApp message
    const message = `👋 *SOLICITUD DE CONTACTO - ${storeConfig.storeName}*
    
👤 *Nombres:* ${name.trim()}
📱 *Teléfono:* ${phone.trim()}
💬 *Consulta u Opinión:*
"${query.trim()}"

_Enviado desde el formulario "Te contactamos" de la tienda web._`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    // Open WhatsApp
    try {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn('Popup blocked', err);
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setQuery('');
      setIsOpen(false);
    }, 3000);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Popup Window */}
      {isOpen && (
        <div className="mb-3 w-[92vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 flex items-center justify-center">
                <PhoneCall className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-bold leading-tight">Te contactamos</h3>
                <p className="text-[11px] text-slate-400">Atención personalizada en Perú</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Cerrar ventana de contacto"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4">
            {submitted ? (
              <div className="py-6 text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">¡Solicitud recibida!</h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Gracias <strong>{name}</strong>. Nos comunicaremos contigo vía WhatsApp o llamada a la brevedad.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <p className="text-xs text-slate-600">
                  Déjanos tus datos y consulta para brindarte asesoría inmediata sobre nuestros productos importados.
                </p>

                {/* Field 1: Nombres */}
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

                {/* Field 2: Número Telefónico */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">
                    Número telefónico (Perú) *
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      placeholder="Ej: 987 654 321"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900"
                    />
                  </div>
                </div>

                {/* Field 3: Consulta u Opinión (máximo 200 caracteres) */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold text-slate-700">
                      Consulta u opinión *
                    </label>
                    <span
                      className={`text-[10px] font-mono tabular-nums ${
                        query.length >= 190
                          ? 'text-rose-600 font-bold'
                          : query.length >= 160
                          ? 'text-amber-600'
                          : 'text-slate-400'
                      }`}
                    >
                      {query.length} / 200 caracteres
                    </span>
                  </div>
                  <div className="relative">
                    <textarea
                      required
                      maxLength={200}
                      rows={3}
                      placeholder="Escribe tu consulta sobre disponibilidad, envíos a Lima o provincias, o productos especiales..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full p-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:bg-white text-slate-900 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-white text-emerald-600" />
                  <span>Enviar por WhatsApp</span>
                </button>

                <div className="text-[10px] text-center text-slate-400">
                  Respuesta rápida en horario comercial · WhatsApp Oficial {storeConfig.whatsappNumber}
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Button: "Te contactamos" */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 group font-bold text-xs"
        aria-label="Abrir formulario Te contactamos"
      >
        <PhoneCall className="w-4 h-4 animate-bounce" />
        <span>Te contactamos</span>
      </button>
    </div>
  );
};
