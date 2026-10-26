import React from "react";
import { Calendar, Clock, MapPin, Sparkles } from "lucide-react";
import { InvitationCardData, PaletteConfig, formatDate, formatDateTime } from "./InvitationCard";

// TEMPLATE 1: Pink Lotus Ganesh Wedding (Reference 1)
export function PinkLotusGaneshLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #C48E9B",
        boxShadow: "0 25px 60px rgba(168, 77, 103, 0.18)",
        backgroundColor: "#F9EFEF",
        backgroundImage: "url(/templates/artwork/pink-lotus-ganesh-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#38222A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(255, 248, 248, 0.28)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ height: 60 }} />
        <div style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "#8C324E", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 8 }}>
          {data.devotionalHeading || "॥ श्री गणेशाय नमः ॥"}
        </div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#8C324E", marginBottom: 12 }}>
          With the blessings of Lord Ganesha & our beloved elders
        </p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, margin: "8px auto 14px" }}>
          <div style={{ width: 44, height: 1, backgroundColor: "#AD8745" }} />
          <span style={{ color: "#D85A8A", fontSize: "1.1rem" }}>🪷</span>
          <div style={{ width: 44, height: 1, backgroundColor: "#AD8745" }} />
        </div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", color: "#4A2A35", marginBottom: 6 }}>
          Together with their families, cordially invite you to celebrate the wedding of
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#7D263F", lineHeight: 1.15, margin: "12px 0 8px", textShadow: "0 2px 8px rgba(255,255,255,0.8)", overflowWrap: "anywhere" }}>
          {data.hostName || "Rohan & Ananya"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7D263F", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Shubh Vivah Ceremony"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(255, 255, 255, 0.72)", backdropFilter: "blur(4px)", borderRadius: 14, borderLeft: "3px solid #D85A8A", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#4A2A35", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.78)", backdropFilter: "blur(6px)", border: "1.5px solid #C48E9B", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#7D263F", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#AD8745" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#38222A" }}>
              <MapPin size={16} color="#7D263F" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

// TEMPLATE 2: Aqua Floral Royal Engagement (Reference 2)
export function AquaFloralEngagementLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #C9A45C",
        boxShadow: "0 25px 60px rgba(50, 100, 120, 0.18)",
        backgroundColor: "#EBF4F6",
        backgroundImage: "url(/templates/artwork/aqua-floral-engagement-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#1A333A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(240, 248, 250, 0.22)", pointerEvents: "none" }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ height: 50 }} />
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.85)", padding: "6px 16px", borderRadius: 20, border: "1px solid #C9A45C", marginBottom: 10 }}>
          <span style={{ fontSize: "1.1rem" }}>💍</span>
          <span style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#7E6023", fontWeight: 700 }}>
            ENGAGEMENT CEREMONY
          </span>
          <span style={{ fontSize: "1.1rem" }}>💍</span>
        </div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#2B515B", marginBottom: 8 }}>
          Two lives, two hearts, joined together in friendship, united forever in love
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#1B4D57", lineHeight: 1.15, margin: "12px 0 8px", textShadow: "0 2px 8px rgba(255,255,255,0.9)", overflowWrap: "anywhere" }}>
          {data.hostName || "Kabir & Tara"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "#7E6023", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Ring Ceremony & Celebration"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(255, 255, 255, 0.82)", backdropFilter: "blur(4px)", borderRadius: 14, borderLeft: "3px solid #C9A45C", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#1A333A", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.85)", backdropFilter: "blur(6px)", border: "1.5px solid #C9A45C", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#1B4D57", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#C9A45C" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#1A333A" }}>
              <MapPin size={16} color="#1B4D57" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
        <div style={{ height: 40 }} />
      </div>
    </div>
  );
}

// TEMPLATE 3: Lavender Floral Royal Wedding (Clean Artwork + Seamless Romantic Typography)
export function LavenderWisteriaWeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const { dateStr, timeStr, full } = formatDateTime(data.eventDate, data.time);
  const hostDisplay = data.hostName && data.hostName !== "Host Name(s)" ? data.hostName : "Riya Sharma & Arjun Verma";
  const venueDisplay = data.venue && data.venue !== "Venue Location" ? data.venue : "";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 700,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #B88E3E",
        boxShadow: "0 25px 60px rgba(110, 60, 140, 0.22)",
        backgroundColor: "#F8F4FA",
        backgroundImage: "url(/templates/artwork/lavender-wisteria-clean-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "clamp(52px, 10vw, 80px) clamp(26px, 6vw, 48px) clamp(58px, 11vw, 88px)",
        textAlign: "center",
        color: "#2F1E3A",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Section: Hanging Wisteria Space + Graceful Heading */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ height: "clamp(28px, 6vw, 46px)" }} />

        <p
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(0.72rem, 1.8vw, 0.82rem)",
            letterSpacing: "0.24em",
            textTransform: "uppercase",
            color: "#8C58A8",
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          TWO HEARTS · ONE ETERNAL JOURNEY
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.05rem, 2.4vw, 1.25rem)",
            color: "#5B3672",
            margin: "4px 0 2px",
          }}
        >
          Together with their families, cordially invite you to the wedding of
        </p>
      </div>

      {/* Middle Section: Grand Calligraphic Couple Names & Occasion */}
      <div style={{ position: "relative", zIndex: 2, margin: "6px 0" }}>
        <h1
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: hostDisplay.length > 20 ? "clamp(2rem, 5vw, 2.7rem)" : "clamp(2.4rem, 6.5vw, 3.8rem)",
            color: "#461B61",
            lineHeight: 1.15,
            fontWeight: 700,
            margin: "4px 0 8px",
            textShadow: "0 2px 8px rgba(255, 255, 255, 0.85)",
            overflowWrap: "anywhere",
          }}
        >
          {hostDisplay}
        </h1>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "6px auto 10px" }}>
          <div style={{ width: 40, height: 1.5, backgroundColor: "#B88E3E", opacity: 0.8 }} />
          <span style={{ color: "#B88E3E", fontSize: "0.9rem" }}>❖</span>
          <div style={{ width: 40, height: 1.5, backgroundColor: "#B88E3E", opacity: 0.8 }} />
        </div>

        <h2
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(0.9rem, 2.2vw, 1.15rem)",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#461B61",
            fontWeight: 600,
            margin: "4px 0 0",
          }}
        >
          {data.title || "Wedding Ceremony & Celebrations"}
        </h2>

        {data.message && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.96rem, 2.2vw, 1.1rem)",
              lineHeight: 1.6,
              color: "#341E42",
              maxWidth: 440,
              margin: "8px auto 0",
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        )}
      </div>

      {/* Bottom Section: Compact Decorative Date, Time & Venue */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "14px 22px",
            borderRadius: 18,
            backgroundColor: "rgba(255, 252, 255, 0.82)",
            backdropFilter: "blur(6px)",
            border: "1.5px solid rgba(184, 142, 62, 0.5)",
            boxShadow: "0 6px 20px rgba(110, 60, 140, 0.12)",
            maxWidth: 460,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {dateStr && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#461B61",
                fontWeight: 700,
                fontSize: "clamp(0.92rem, 2.2vw, 1.05rem)",
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.04em",
              }}
            >
              <Calendar size={16} color="#B88E3E" />
              <span>{dateStr}</span>
            </div>
          )}

          {timeStr && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#8C58A8",
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.06em",
              }}
            >
              <Clock size={15} color="#8C58A8" />
              <span>{timeStr}</span>
            </div>
          )}

          {!dateStr && !timeStr && full && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#461B61",
                fontWeight: 700,
                fontSize: "clamp(0.92rem, 2.2vw, 1.05rem)",
                fontFamily: "Cinzel, serif",
              }}
            >
              <Calendar size={16} color="#B88E3E" />
              <span>{full}</span>
            </div>
          )}

          {venueDisplay && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: "clamp(0.88rem, 2vw, 0.98rem)",
                color: "#2F1E3A",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              <MapPin size={16} color="#461B61" />
              <span style={{ overflowWrap: "anywhere" }}>{venueDisplay}</span>
            </div>
          )}
        </div>

        <div style={{ height: "clamp(16px, 3.5vw, 26px)" }} />
      </div>
    </div>
  );
}

// TEMPLATE 4: Traditional Marathi God Bharai (Clean Artwork + Integrated Devotional Typography)
export function MarathiGodBharaiLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const { dateStr, timeStr, full } = formatDateTime(data.eventDate, data.time);
  const hostDisplay = data.hostName && data.hostName !== "Host Name(s)" ? data.hostName : "सौ. जया आशिष वर्मा";
  const venueDisplay = data.venue && data.venue !== "Venue Location" ? data.venue : "";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 700,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #B87A4F",
        boxShadow: "0 25px 60px rgba(184, 122, 79, 0.2)",
        backgroundColor: "#FAF5EE",
        backgroundImage: "url(/templates/artwork/marathi-god-bharai-clean-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "clamp(48px, 8vw, 72px) clamp(24px, 5.5vw, 44px) clamp(64px, 11vw, 92px)",
        textAlign: "center",
        color: "#2C1408",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Section: Space for Ganesha + Devotional Blessing & Header */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Generous safe clearance below Lord Ganesha deity */}
        <div style={{ height: "clamp(90px, 16vw, 130px)" }} />

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.95rem, 2.2vw, 1.1rem)",
            color: "#542D15",
            margin: "0 0 4px",
            fontStyle: "italic",
            fontWeight: 700,
            textShadow: "0 1px 6px rgba(255, 255, 255, 0.95)",
          }}
        >
          {data.familyName || "॥ श्री गणेशाय नमः · माँ कुलदेवी की असीम कृपा से ॥"}
        </p>

        {/* Heading: Traditional Calligraphic Dohale Jevan / God Bharai */}
        <h1
          style={{
            fontFamily: "'Rozha One', 'Yatra One', var(--font-serif)",
            fontSize: "clamp(2.3rem, 6vw, 3.4rem)",
            color: "#7D1E10",
            lineHeight: 1.18,
            margin: "4px 0 6px",
            fontWeight: 800,
            textShadow: "0 2px 12px rgba(255, 255, 255, 0.98), 0 1px 2px rgba(125, 30, 16, 0.2)",
          }}
        >
          {data.title || "गोद भराई समारोह"}
        </h1>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.98rem, 2.3vw, 1.14rem)",
            color: "#4A220E",
            margin: "0 auto 8px",
            fontStyle: "italic",
            fontWeight: 600,
            maxWidth: 420,
            textShadow: "0 1px 6px rgba(255, 255, 255, 0.95)",
          }}
        >
          खुशियों की बहार लेकर आने वाला है एक नन्हा मेहमान · स्वागत को हम उत्सुक
        </p>
      </div>

      {/* Middle Section: Celebrant Name + Warm Invitation Invocation */}
      <div style={{ position: "relative", zIndex: 2, margin: "6px 0" }}>
        <p
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(0.74rem, 1.9vw, 0.82rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#7D1E10",
            fontWeight: 800,
            marginBottom: 4,
            textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
          }}
        >
          स्नेह निमंत्रण
        </p>

        <h2
          style={{
            fontFamily: "'Rozha One', 'Yatra One', var(--font-serif)",
            fontSize: hostDisplay.length > 20 ? "clamp(1.8rem, 4.4vw, 2.3rem)" : "clamp(2.2rem, 5.5vw, 3.2rem)",
            color: "#12422C",
            lineHeight: 1.2,
            fontWeight: 800,
            margin: "4px 0 8px",
            textShadow: "0 2px 10px rgba(255, 255, 255, 0.95)",
            overflowWrap: "anywhere",
          }}
        >
          {hostDisplay}
        </h2>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.98rem, 2.3vw, 1.14rem)",
            color: "#2C1408",
            margin: "4px auto 0",
            fontStyle: "italic",
            fontWeight: 600,
            maxWidth: 440,
            textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
          }}
        >
          की गोद भराई एवं स्नेहभोज में आपकी गरिमामयी उपस्थिति सादर प्रार्थनीय है।
        </p>

        {data.message && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.94rem, 2.1vw, 1.08rem)",
              lineHeight: 1.5,
              color: "#2C1408",
              fontWeight: 600,
              maxWidth: 420,
              margin: "6px auto 0",
              whiteSpace: "pre-wrap",
              textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
            }}
          >
            “{data.message}”
          </p>
        )}
      </div>

      {/* Bottom Section: Compact Date, Time & Venue */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "14px 22px",
            borderRadius: 18,
            backgroundColor: "rgba(255, 250, 244, 0.82)",
            backdropFilter: "blur(6px)",
            border: "1.5px solid rgba(184, 122, 79, 0.5)",
            boxShadow: "0 6px 20px rgba(184, 122, 79, 0.12)",
            maxWidth: 460,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {dateStr && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#822718",
                fontWeight: 700,
                fontSize: "clamp(0.92rem, 2.2vw, 1.05rem)",
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.04em",
              }}
            >
              <Calendar size={16} color="#B87A4F" />
              <span>{dateStr}</span>
            </div>
          )}

          {timeStr && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#184E38",
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.06em",
              }}
            >
              <Clock size={15} color="#184E38" />
              <span>{timeStr}</span>
            </div>
          )}

          {!dateStr && !timeStr && full && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#822718",
                fontWeight: 700,
                fontSize: "clamp(0.92rem, 2.2vw, 1.05rem)",
                fontFamily: "Cinzel, serif",
              }}
            >
              <Calendar size={16} color="#B87A4F" />
              <span>{full}</span>
            </div>
          )}

          {venueDisplay && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: "clamp(0.88rem, 2vw, 0.98rem)",
                color: "#341C10",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              <MapPin size={16} color="#822718" />
              <span style={{ overflowWrap: "anywhere" }}>{venueDisplay}</span>
            </div>
          )}
        </div>

        <div style={{ height: "clamp(16px, 3.5vw, 26px)" }} />
      </div>
    </div>
  );
}

// TEMPLATE 5: Marigold Haldi Ceremony (Clean Artwork + Seamless Integrated Typography)
export function MarigoldHaldiLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const { dateStr, timeStr, full } = formatDateTime(data.eventDate, data.time);
  const hostDisplay = data.hostName && data.hostName !== "Host Name(s)" ? data.hostName : "Aarav & Meera";
  const venueDisplay = data.venue && data.venue !== "Venue Location" ? data.venue : "";

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 720,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #D69F3D",
        boxShadow: "0 25px 60px rgba(214, 159, 61, 0.22)",
        backgroundColor: "#FFFDF6",
        backgroundImage: "url(/templates/artwork/marigold-haldi-clean-bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "clamp(64px, 12vw, 96px) clamp(26px, 6vw, 48px) clamp(54px, 10vw, 84px)",
        textAlign: "center",
        color: "#342308",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Section: Sub-Header + Grand Haldi Ceremony Display Title */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <p
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(0.74rem, 1.9vw, 0.85rem)",
            letterSpacing: "0.26em",
            textTransform: "uppercase",
            color: "#824600",
            fontWeight: 800,
            margin: "0 0 6px",
            textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
          }}
        >
          TWO HEARTS · ONE JOYOUS CELEBRATION
        </p>

        <p
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontStyle: "italic",
            fontSize: "clamp(1.08rem, 2.6vw, 1.28rem)",
            color: "#3D2403",
            margin: "2px 0 0",
            fontWeight: 600,
            textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
          }}
        >
          We cordially invite you to celebrate the
        </p>

        {/* Grand Headline: Haldi Ceremony in Calligraphic Script */}
        <h1
          style={{
            fontFamily: "'Great Vibes', cursive",
            fontSize: "clamp(4.2rem, 11vw, 6.2rem)",
            color: "#B36800",
            lineHeight: 1.05,
            margin: "2px 0 0",
            textShadow: "0 2px 12px rgba(255, 255, 255, 0.98), 0 1px 3px rgba(120, 50, 0, 0.25)",
          }}
        >
          Haldi
        </h1>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            margin: "2px auto 10px",
          }}
        >
          <div style={{ width: 44, height: 1.5, backgroundColor: "#C68212", opacity: 0.9 }} />
          <span
            style={{
              fontFamily: "Cinzel, serif",
              fontSize: "clamp(0.88rem, 2vw, 1.08rem)",
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "#543304",
              fontWeight: 800,
              textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
            }}
          >
            CEREMONY
          </span>
          <div style={{ width: 44, height: 1.5, backgroundColor: "#C68212", opacity: 0.9 }} />
        </div>
      </div>

      {/* Middle Section: Couple/Host Name + Personal Invitation Note */}
      <div style={{ position: "relative", zIndex: 2, margin: "6px 0" }}>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(0.96rem, 2.2vw, 1.1rem)",
            color: "#543810",
            marginBottom: 6,
            fontStyle: "italic",
            fontWeight: 600,
            textShadow: "0 1px 4px rgba(255, 255, 255, 0.9)",
          }}
        >
          honouring our beloved
        </p>

        <h2
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: hostDisplay.length > 20 ? "clamp(1.8rem, 4.5vw, 2.3rem)" : "clamp(2.2rem, 5.8vw, 3.2rem)",
            color: "#164426",
            lineHeight: 1.15,
            fontWeight: 800,
            margin: "4px 0 10px",
            textShadow: "0 2px 10px rgba(255, 255, 255, 0.95)",
            overflowWrap: "anywhere",
          }}
        >
          {hostDisplay}
        </h2>

        {data.message && (
          <p
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.98rem, 2.2vw, 1.12rem)",
              lineHeight: 1.6,
              color: "#38250C",
              maxWidth: 440,
              margin: "6px auto 0",
              whiteSpace: "pre-wrap",
            }}
          >
            “{data.message}”
          </p>
        )}
      </div>

      {/* Bottom Section: Compact Decorative Date, Time & Venue */}
      <div style={{ position: "relative", zIndex: 2 }}>
        <div
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
            padding: "14px 22px",
            borderRadius: 18,
            backgroundColor: "rgba(255, 252, 242, 0.82)",
            backdropFilter: "blur(6px)",
            border: "1.5px solid rgba(214, 159, 61, 0.55)",
            boxShadow: "0 6px 20px rgba(184, 122, 30, 0.12)",
            maxWidth: 460,
            width: "100%",
            margin: "0 auto",
          }}
        >
          {dateStr && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#9E5F00",
                fontWeight: 700,
                fontSize: "clamp(0.92rem, 2.2vw, 1.05rem)",
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.04em",
              }}
            >
              <Calendar size={16} color="#D69F3D" />
              <span>{dateStr}</span>
            </div>
          )}

          {timeStr && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#234B32",
                fontWeight: 700,
                fontSize: "clamp(0.9rem, 2vw, 1rem)",
                fontFamily: "Cinzel, serif",
                letterSpacing: "0.06em",
              }}
            >
              <Clock size={15} color="#234B32" />
              <span>{timeStr}</span>
            </div>
          )}

          {!dateStr && !timeStr && full && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                color: "#9E5F00",
                fontWeight: 700,
                fontSize: "clamp(0.92rem, 2.2vw, 1.05rem)",
                fontFamily: "Cinzel, serif",
              }}
            >
              <Calendar size={16} color="#D69F3D" />
              <span>{full}</span>
            </div>
          )}

          {venueDisplay && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontSize: "clamp(0.88rem, 2vw, 0.98rem)",
                color: "#342308",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 600,
              }}
            >
              <MapPin size={16} color="#C67A00" />
              <span style={{ overflowWrap: "anywhere" }}>{venueDisplay}</span>
            </div>
          )}
        </div>

        <div style={{ height: "clamp(16px, 3.5vw, 28px)" }} />
      </div>
    </div>
  );
}

// TEMPLATE 6: Elegant Walima Islamic Wedding (Reference 6)
export function ChampagneWalimaLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #C2A368",
        boxShadow: "0 25px 60px rgba(194, 163, 104, 0.18)",
        backgroundColor: "#F9F5EE",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#2C2620",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1px solid #C2A368", borderRadius: 16, pointerEvents: "none", opacity: 0.8 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div dir="rtl" lang="ar" style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#594425", fontWeight: 700, marginBottom: 4 }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "0.95rem", color: "#8C6F3E", marginBottom: 10 }}>
          “In the name of Allah, the Most Beneficent, the Most Merciful”
        </p>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#594425", fontWeight: 600, marginBottom: 8 }}>
          CORDIALLY INVITE YOU TO THE WALIMA RECEPTION OF
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#4A3419", lineHeight: 1.15, margin: "10px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Farhan & Yasmin"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#8C6F3E", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Grand Walima Reception"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(194, 163, 104, 0.15)", borderRadius: 14, borderLeft: "3px solid #C2A368", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#2C2620", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1.5px solid #C2A368", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#4A3419", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#C2A368" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#2C2620" }}>
              <MapPin size={16} color="#4A3419" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// TEMPLATE 7: Embossed Burgundy Floral (Reference 7)
export function BurgundyEmbossedLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #8B263E",
        boxShadow: "0 25px 60px rgba(139, 38, 62, 0.18)",
        backgroundColor: "#FAF6F0",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#341E25",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1.5px solid #8B263E", borderRadius: 16, pointerEvents: "none", opacity: 0.85 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.8rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#8B263E", fontWeight: 700, marginBottom: 8 }}>
          TOGETHER WITH THEIR FAMILIES
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#6A4A52", marginBottom: 12 }}>
          Request the pleasure of your company at their celebration
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#8B263E", lineHeight: 1.15, margin: "12px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Alistair & Vivienne"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#341E25", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Wedding & Celebration"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(139, 38, 62, 0.12)", borderRadius: 14, borderLeft: "3px solid #8B263E", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#341E25", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.95)", border: "1.5px solid #8B263E", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#8B263E", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#8B263E" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#341E25" }}>
              <MapPin size={16} color="#8B263E" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// TEMPLATE 8: Deep Burgundy Royal Nikah (Reference 8)
export function BurgundyRoyalNikahLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #D6B574",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.5)",
        backgroundColor: "#2A0D19",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#FAF6EF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1px solid #D6B574", borderRadius: 16, pointerEvents: "none", opacity: 0.8 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <div dir="rtl" lang="ar" style={{ fontFamily: "'Amiri', serif", fontSize: "clamp(1.6rem, 4vw, 2.2rem)", color: "#D6B574", fontWeight: 700, marginBottom: 4 }}>
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </div>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "0.95rem", color: "#E8D5B0", marginBottom: 10 }}>
          “In the name of Allah, the Most Gracious, the Most Merciful”
        </p>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#D6B574", fontWeight: 600, marginBottom: 8 }}>
          IN THE GRACIOUS PRESENCE OF FAMILY & FRIENDS
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#FFFFFF", lineHeight: 1.15, margin: "10px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Tariq & Zeenat"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D6B574", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Holy Nikah Ceremony"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(214, 181, 116, 0.15)", borderRadius: 14, borderLeft: "3px solid #D6B574", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#FAF6EF", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(58, 20, 36, 0.85)", border: "1.5px solid #D6B574", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#D6B574", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#D6B574" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#FAF6EF" }}>
              <MapPin size={16} color="#D6B574" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 6 ADDITIONAL ORIGINAL PREMIUM TEMPLATES

// 9. Royal Mughal Wedding
export function RoyalMughalWeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #AD8745",
        boxShadow: "0 25px 60px rgba(173, 135, 69, 0.2)",
        backgroundColor: "#FAF4EB",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#3B2A1E",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1.5px solid #AD8745", borderRadius: 16, pointerEvents: "none", opacity: 0.85 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.8rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#AD8745", fontWeight: 700, marginBottom: 8 }}>
          ROYAL MUGHAL MATRIMONY
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#684B34", marginBottom: 12 }}>
          Under the auspices of heritage & regal blessings
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#5C1D24", lineHeight: 1.15, margin: "12px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Shahzade & Begum"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#AD8745", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Grand Dawat & Royal Vivah"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(173, 135, 69, 0.12)", borderRadius: 14, borderLeft: "3px solid #AD8745", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#3B2A1E", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1.5px solid #AD8745", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#5C1D24", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#AD8745" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#3B2A1E" }}>
              <MapPin size={16} color="#5C1D24" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 10. Midnight Celestial Wedding
export function MidnightCelestialWeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #E2C485",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6)",
        backgroundColor: "#0F1A2E",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#FAF6EE",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1px solid #E2C485", borderRadius: 16, pointerEvents: "none", opacity: 0.8 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.8rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#E2C485", fontWeight: 700, marginBottom: 8 }}>
          ✦ WRITTEN IN THE STARS ✦
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#D4DEEC", marginBottom: 12 }}>
          Together under the celestial sky
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#FFFFFF", lineHeight: 1.15, margin: "12px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Aurelius & Seraphina"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#E2C485", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Celestial Twilight Wedding"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(226, 196, 133, 0.15)", borderRadius: 14, borderLeft: "3px solid #E2C485", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#FAF6EE", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(15, 26, 46, 0.85)", border: "1.5px solid #E2C485", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#E2C485", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#E2C485" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#FAF6EE" }}>
              <MapPin size={16} color="#E2C485" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 11. Minimal Editorial Wedding
export function MinimalEditorialWeddingLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "1.5px solid #252329",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.08)",
        backgroundColor: "#FAF6EF",
        padding: "clamp(44px, 7vw, 64px) clamp(28px, 6vw, 48px)",
        textAlign: "center",
        color: "#252329",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.75rem", letterSpacing: "0.3em", textTransform: "uppercase", opacity: 0.75, marginBottom: 16 }}>
          INVITATION
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.15rem", opacity: 0.85, marginBottom: 14 }}>
          Together with their families
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.6rem, 6.5vw, 4rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.1, margin: "16px 0", overflowWrap: "anywhere" }}>
          {data.hostName || "Julian & Clara"}
        </h1>
        <div style={{ width: 40, height: 1, backgroundColor: "#252329", opacity: 0.4, margin: "20px auto" }} />
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1rem, 2vw, 1.2rem)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginBottom: 12 }}>
          {data.title || "Wedding Celebration"}
        </h2>
      </div>

      {data.message && (
        <div style={{ margin: "16px auto", maxWidth: 440 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", lineHeight: 1.7, opacity: 0.9, margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, maxWidth: 440, margin: "0 auto", borderTop: "1px solid rgba(37,35,41,0.15)", paddingTop: 16 }}>
          {formattedDate && (
            <div style={{ fontSize: "1rem", letterSpacing: "0.08em", fontFamily: "Cinzel, serif" }}>
              {formattedDate}
            </div>
          )}
          {data.venue && (
            <div style={{ fontSize: "0.92rem", opacity: 0.75, overflowWrap: "anywhere" }}>
              {data.venue}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 12. Rose Garden Engagement
export function RoseGardenEngagementLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #C27B8A",
        boxShadow: "0 25px 60px rgba(194, 123, 138, 0.2)",
        backgroundColor: "#FDF7F8",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#3D242B",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1.5px solid #C27B8A", borderRadius: 16, pointerEvents: "none", opacity: 0.8 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.78rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "#A04E60", fontWeight: 700, marginBottom: 8 }}>
          ROSE GARDEN ENGAGEMENT
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#6F4A53", marginBottom: 12 }}>
          Joyfully invite you to celebrate the engagement of
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#8C324E", lineHeight: 1.15, margin: "12px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Lucas & Genevieve"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A04E60", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Ring Ceremony & Garden Soirée"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(194, 123, 138, 0.15)", borderRadius: 14, borderLeft: "3px solid #C27B8A", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#3D242B", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1.5px solid #C27B8A", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#8C324E", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#C27B8A" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#3D242B" }}>
              <MapPin size={16} color="#8C324E" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 13. Pearl Anniversary
export function PearlAnniversaryLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate, data.time);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #D6B574",
        boxShadow: "0 25px 60px rgba(214, 181, 116, 0.2)",
        backgroundColor: "#FAF7F2",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#2F2A24",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1.5px solid #D6B574", borderRadius: 16, pointerEvents: "none", opacity: 0.8 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.8rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#A88238", fontWeight: 700, marginBottom: 8 }}>
          PEARL ANNIVERSARY GALA
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#685D4E", marginBottom: 12 }}>
          Celebrating thirty years of devotion, love & timeless memories
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#3A1424", lineHeight: 1.15, margin: "12px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Vikram & Radhika"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#A88238", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "30th Anniversary Celebration"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(214, 181, 116, 0.15)", borderRadius: 14, borderLeft: "3px solid #D6B574", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#2F2A24", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1.5px solid #D6B574", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#3A1424", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#D6B574" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#2F2A24" }}>
              <MapPin size={16} color="#3A1424" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 14. Royal Reception
export function RoyalReceptionLayout({ data, palette }: { data: InvitationCardData; palette: PaletteConfig }) {
  const formattedDate = formatDate(data.eventDate);
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: 640,
        borderRadius: 24,
        overflow: "hidden",
        border: "3px solid #D6B574",
        boxShadow: "0 25px 60px rgba(0, 0, 0, 0.55)",
        backgroundColor: "#3A1424",
        padding: "clamp(36px, 6vw, 56px) clamp(22px, 5vw, 42px)",
        textAlign: "center",
        color: "#FAF6EF",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ position: "absolute", inset: 12, border: "1.5px solid #D6B574", borderRadius: 16, pointerEvents: "none", opacity: 0.85 }} />
      <div style={{ position: "relative", zIndex: 2 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: "0.8rem", letterSpacing: "0.24em", textTransform: "uppercase", color: "#D6B574", fontWeight: 700, marginBottom: 8 }}>
          ROYAL WEDDING RECEPTION
        </p>
        <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1.05rem", color: "#E8D5B0", marginBottom: 12 }}>
          Request the honour of your presence at the reception dinner
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.4rem, 6vw, 3.6rem)", color: "#FFFFFF", lineHeight: 1.15, margin: "12px 0 8px", overflowWrap: "anywhere" }}>
          {data.hostName || "Devendra & Ananya"}
        </h1>
        <h2 style={{ fontFamily: "Cinzel, serif", fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)", letterSpacing: "0.14em", textTransform: "uppercase", color: "#D6B574", fontWeight: 600, marginBottom: 12 }}>
          {data.title || "Grand Reception & Banquet"}
        </h2>
      </div>

      {data.message && (
        <div style={{ position: "relative", zIndex: 2, margin: "10px auto", padding: "10px 18px", backgroundColor: "rgba(214, 181, 116, 0.15)", borderRadius: 14, borderLeft: "3px solid #D6B574", maxWidth: 460 }}>
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontStyle: "italic", fontSize: "1rem", lineHeight: 1.6, color: "#FAF6EF", margin: 0, whiteSpace: "pre-wrap" }}>
            “{data.message}”
          </p>
        </div>
      )}

      <div style={{ position: "relative", zIndex: 2 }}>
        <div style={{ display: "inline-flex", flexDirection: "column", gap: 8, backgroundColor: "rgba(42, 13, 25, 0.85)", border: "1.5px solid #D6B574", borderRadius: 16, padding: "14px 22px", maxWidth: 460, width: "100%", margin: "0 auto" }}>
          {formattedDate && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, color: "#D6B574", fontWeight: 600, fontSize: "1rem", fontFamily: "Cinzel, serif" }}>
              <Calendar size={16} color="#D6B574" />
              <span>{formattedDate}</span>
            </div>
          )}
          {data.venue && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: "0.92rem", color: "#FAF6EF" }}>
              <MapPin size={16} color="#D6B574" />
              <span style={{ overflowWrap: "anywhere" }}>{data.venue}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
