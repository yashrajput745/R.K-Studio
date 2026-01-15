import React, { useState } from "react";
import { toast } from "sonner";
import gallery1 from "../assets/gallery-1.jpg";
import gallery2 from "../assets/gallery-2.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import gallery5 from "../assets/gallery-5.jpg";
import gallery6 from "../assets/gallery-6.jpg";
import rkStudioLogo from "../assets/rk-studio-logo.jpg";

interface Service {
  id: string;
  title: string;
  desc: string;
  price: number;
  duration: string;
  tag: string;
}

interface CartItem extends Service {
  uid: number;
}

interface AISuggestion {
  text: string;
  tag: string;
}

export default function Index() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [showBooking, setShowBooking] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState<AISuggestion | null>(null);

  const services: Service[] = [
    {
      id: "prints-8x10",
      title: "8x10 Photo Print",
      desc: "High-quality glossy print on archival paper.",
      price: 250,
      duration: "1 day",
      tag: "Print",
    },
    {
      id: "framing-basic",
      title: "Basic Frame (A4)",
      desc: "Wooden frame with glass. Multiple finishes available.",
      price: 800,
      duration: "2 days",
      tag: "Frame",
    },
    {
      id: "restoration",
      title: "Photo Restoration",
      desc: "Remove scratches, color-correct and restore old photos.",
      price: 1200,
      duration: "3-5 days",
      tag: "Editing",
    },
    {
      id: "passport",
      title: "Passport / ID Photos",
      desc: "Studio-lit, compliant passport photos, printed instantly.",
      price: 250,
      duration: "Same day",
      tag: "ID",
    },
    {
      id: "event-mini",
      title: "Mini Event Shoot (2 hrs)",
      desc: "2 hours coverage, 30 edited photos delivered digitally.",
      price: 5000,
      duration: "1 week",
      tag: "Shoot",
    },
    {
      id: "pro-edit",
      title: "Professional Editing (per photo)",
      desc: "Retouching, color grading, background removal.",
      price: 400,
      duration: "2 days",
      tag: "Editing",
    },
  ];

  const gallery = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

  function addToCart(service: Service) {
    setCart((c) => [...c, { ...service, uid: Date.now() + Math.random() }]);
    toast.success(`Added to cart: ${service.title}`);
  }

  function removeFromCart(uid: number) {
    setCart((c) => c.filter((i) => i.uid !== uid));
  }

  function subtotal() {
    return cart.reduce((s, it) => s + it.price, 0);
  }

  function runAiSuggestion(prompt: string) {
    const p = prompt.toLowerCase();
    let suggestion: AISuggestion = { text: "Try our classic color pop + soft vignette — great for portraits.", tag: "Style" };
    if (p.includes("old") || p.includes("restore") || p.includes("vintage")) {
      suggestion = { text: "Suggest: Gentle dust & scratch removal + warm tone colorization.", tag: "Restoration" };
    } else if (p.includes("frame") || p.includes("wall")) {
      suggestion = { text: "Suggest: Matte black slim frame for modern interiors or oak finish for warm tones.", tag: "Frame" };
    } else if (p.includes("passport") || p.includes("id")) {
      suggestion = { text: "Use plain white background, neutral expression. We ensure compliance.", tag: "ID" };
    } else if (p.includes("wedding") || p.includes("event")) {
      suggestion = { text: "Recommend our Event Shoot + 50 edited highlights package.", tag: "Shoot" };
    }
    setTimeout(() => setAiSuggestion(suggestion), 400);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10 p-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img 
              src={rkStudioLogo} 
              alt="R.K STUDIO Professional Photography" 
              className="mx-auto w-full max-w-md rounded-2xl shadow-[var(--shadow-strong)] border border-border"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
            Welcome to R.K STUDIO 
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Professional Photography • Frames • Prints • Restoration
          </p>
          <button
            onClick={() => { window.scrollTo({ top: window.innerHeight, behavior: 'smooth' }); }}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-lg hover:bg-primary/90 transition-colors shadow-[var(--shadow-medium)]"
          >
            Explore Our Services
          </button>
        </div>
      </section>

      <header className="max-w-6xl mx-auto flex items-center justify-between py-6 px-6">
        <div className="flex items-center gap-4">
          <img 
            src={rkStudioLogo} 
            alt="R.K STUDIO Logo" 
            className="w-16 h-16 rounded-lg shadow-md border border-border object-cover"
          />
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">R.K STUDIO</h2>
            <p className="text-sm text-muted-foreground">Professional Photography Services</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <button
            onClick={() => { window.scrollTo({ top: window.innerHeight + 800, behavior: 'smooth' }); }}
            className="px-4 py-2 rounded-lg border border-border shadow-sm text-sm text-foreground hover:bg-secondary transition-colors"
          >
            Services
          </button>
          <button
            onClick={() => { window.scrollTo({ top: window.innerHeight + 1400, behavior: 'smooth' }); }}
            className="px-4 py-2 rounded-lg border border-border shadow-sm text-sm text-foreground hover:bg-secondary transition-colors"
          >
            Gallery
          </button>
          <button
            onClick={() => setShowCart(true)}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm hover:bg-primary/90 transition-colors"
          >
            Cart ({cart.length})
          </button>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
        <section className="md:col-span-2 bg-card rounded-2xl p-6 shadow-[var(--shadow-medium)] border border-border">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground">Our Services</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {services.map((s) => (
              <article key={s.id} className="border border-border rounded-lg p-4 hover:shadow-[var(--shadow-medium)] transition-all duration-300 bg-card">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-card-foreground">{s.title}</h3>
                    <p className="text-sm text-muted-foreground">{s.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">Turnaround: {s.duration} · {s.tag}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-card-foreground">₹{s.price}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => { setSelectedService(s); setShowBooking(true); }}
                        className="px-3 py-1 border border-border rounded text-sm text-foreground hover:bg-secondary transition-colors"
                      >Book</button>
                      <button
                        onClick={() => addToCart(s)}
                        className="px-3 py-1 bg-success text-success-foreground rounded text-sm hover:bg-success/90 transition-colors"
                      >Add</button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <hr className="my-6 border-border" />

          <h3 className="text-lg font-semibold mb-2 text-card-foreground">R.K AI — Quick suggestions</h3>
          <p className="text-sm text-muted-foreground mb-2">Type what you want (e.g., "vintage portrait restoration", "frame for living room")</p>
          <div className="flex gap-2">
            <input
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Ask R.K AI..."
              className="flex-1 border border-input rounded px-3 py-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <button
              onClick={() => { setAiSuggestion(null); runAiSuggestion(aiPrompt); }}
              className="px-4 py-2 bg-ai-primary text-white rounded hover:bg-ai-primary/90 transition-colors"
            >Suggest</button>
          </div>
          {aiSuggestion && (
            <div className="mt-4 p-3 rounded bg-ai-secondary border border-border">
              <p className="text-sm text-card-foreground"><strong>{aiSuggestion.tag} suggestion:</strong> {aiSuggestion.text}</p>
              <div className="mt-2">
                <button
                  onClick={() => {
                    const match = services.find((ss) => ss.tag.toLowerCase() === aiSuggestion.tag.toLowerCase());
                    if (match) {
                      setSelectedService(match);
                      setShowBooking(true);
                    }
                  }}
                  className="px-3 py-1 text-sm rounded border border-border text-foreground hover:bg-secondary transition-colors"
                >Use suggestion</button>
              </div>
            </div>
          )}
        </section>

        <aside className="bg-card rounded-2xl p-6 shadow-[var(--shadow-medium)] border border-border">
          <h3 className="font-bold text-lg text-card-foreground">Studio Highlights</h3>
          <ul className="mt-3 text-sm space-y-2 text-muted-foreground">
            <li>• Free consultation for framing choices</li>
            <li>• Same-day passport photos</li>
            <li>• 100% satisfaction on restores</li>
            <li>• Local delivery available</li>
          </ul>

          <div className="mt-6">
            <h4 className="font-semibold text-card-foreground">Quick Gallery</h4>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {gallery.slice(0, 6).map((g, i) => (
                <img key={i} src={g} alt={`gallery-${i}`} className="w-full h-20 object-cover rounded" />
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-card-foreground">Contact</h4>
            <p className="text-sm text-muted-foreground">123 Studio Lane, YourCity</p>
            <p className="text-sm text-muted-foreground">Phone: +91 98765 43210</p>
            <button
              onClick={() => toast.info("Contact form coming soon. Please call us for now!")}
              className="mt-3 w-full px-3 py-2 rounded bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >Request Callback</button>
          </div>
        </aside>

        <section className="md:col-span-3 bg-card rounded-2xl p-6 shadow-[var(--shadow-medium)] border border-border mt-6">
          <h2 className="text-2xl font-bold mb-4 text-card-foreground">Gallery</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {gallery.map((g, i) => (
              <figure key={i} className="rounded overflow-hidden">
                <img src={g} alt={`Professional photography sample ${i + 1}`} className="w-full h-36 object-cover" />
                <figcaption className="text-xs text-muted-foreground p-1">Sample Photo #{i + 1}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      </main>

      {/* Booking modal */}
      {showBooking && selectedService && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-2xl w-full max-w-xl p-6 border border-border">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-card-foreground">Book: {selectedService.title}</h3>
                <p className="text-sm text-muted-foreground">{selectedService.desc}</p>
              </div>
              <button 
                onClick={() => { setShowBooking(false); setSelectedService(null); }} 
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                const name = formData.get('name') as string;
                const phone = formData.get('phone') as string;
                addToCart(selectedService);
                setShowBooking(false);
                setSelectedService(null);
                toast(toast.success(`Thanks ${name}! We'll contact ${phone}.`));
              }}
              className="mt-4 space-y-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input 
                  name="name" 
                  required 
                  placeholder="Full name" 
                  className="border border-input rounded px-3 py-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring" 
                />
                <input 
                  name="phone" 
                  required 
                  placeholder="Phone" 
                  className="border border-input rounded px-3 py-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring" 
                />
              </div>
              <textarea 
                name="notes" 
                placeholder="Any notes (frame color, finish...)" 
                className="w-full border border-input rounded px-3 py-2 text-foreground bg-background focus:outline-none focus:ring-2 focus:ring-ring" 
              />
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-card-foreground">Price: <strong>₹{selectedService.price}</strong></p>
                </div>
                <div className="flex gap-2">
                  <button 
                    type="button" 
                    onClick={() => { addToCart(selectedService); setShowBooking(false); setSelectedService(null); }} 
                    className="px-4 py-2 border border-border rounded text-foreground hover:bg-secondary transition-colors"
                  >
                    Add to cart
                  </button>
                  <button 
                    type="submit" 
                    className="px-4 py-2 bg-success text-success-foreground rounded hover:bg-success/90 transition-colors"
                  >
                    Book & Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Cart drawer */}
      {showCart && (
        <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-card shadow-[var(--shadow-strong)] p-4 overflow-auto z-40 border-l border-border">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-card-foreground">Your Cart ({cart.length})</h3>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowCart(false)} 
                className="text-sm px-3 py-1 border border-border rounded text-foreground hover:bg-secondary transition-colors"
              >
                Close
              </button>
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {cart.length === 0 && <p className="text-sm text-muted-foreground">No items yet. Add services from the list.</p>}

            {cart.map((c) => (
              <div key={c.uid} className="flex items-center justify-between border border-border rounded p-2 bg-card">
                <div>
                  <p className="font-semibold text-sm text-card-foreground">{c.title}</p>
                  <p className="text-xs text-muted-foreground">{c.desc}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-card-foreground">₹{c.price}</p>
                  <button 
                    onClick={() => removeFromCart(c.uid)} 
                    className="text-xs mt-1 text-destructive hover:text-destructive/80 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {cart.length > 0 && (
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-card-foreground">Subtotal: <strong>₹{subtotal()}</strong></p>
                <div className="mt-3 flex gap-2">
                  <button 
                    onClick={() => { 
                      toast("Checkout demo — integrate payment gateway here."); 
                    }} 
                    className="px-4 py-2 bg-accent text-accent-foreground rounded hover:bg-accent/90 transition-colors"
                  >
                    Checkout
                  </button>
                  <button 
                    onClick={() => { setCart([]); }} 
                    className="px-4 py-2 border border-border rounded text-foreground hover:bg-secondary transition-colors"
                  >
                    Clear
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="max-w-6xl mx-auto mt-8 text-center text-muted-foreground text-sm">
        © {new Date().getFullYear()} R.K STUDIO • Demo App
      </footer>
    </div>
  );
}