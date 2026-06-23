"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";

// Preset configurations for premium UX
const PRESETS = [
  {
    name: "Cyber Neon ⚡",
    savedText: "CYBERPUNK 2077 // FUTURE IS NOW // SYSTEMS ONLINE ⚡",
    fontSize: 15,
    textColor: "#00ffcc",
    trackBackground: "#0b0c10",
    fontFamily: "var(--font-outfit)",
    fontWeight: "900",
    direction: "r2l",
    speed: 8,
    loopCount: "infinite",
    pauseOnHover: true,
    borderStyle: "solid",
    textGap: 4
  },
  {
    name: "Editorial Serif ✍️",
    savedText: "The Daily Chronicle — Literature, Philosophy, and Modern Prose.",
    fontSize: 10,
    textColor: "#ffffff",
    trackBackground: "#161616",
    fontFamily: "var(--font-playfair)",
    fontWeight: "normal",
    direction: "l2r",
    speed: 4,
    loopCount: "infinite",
    pauseOnHover: false,
    borderStyle: "double",
    textGap: 6
  },
  {
    name: "Retro Terminal 👾",
    savedText: "SYSTEM ERROR 404: CORE DUMP COMPLETE. REBOOTING... [OK]",
    fontSize: 7,
    textColor: "#39ff14",
    trackBackground: "#000000",
    fontFamily: "var(--font-geist-mono)",
    fontWeight: "bold",
    direction: "r2l",
    speed: 6,
    loopCount: "3",
    pauseOnHover: true,
    borderStyle: "dashed",
    textGap: 2
  },
  {
    name: "Minimalist Black & White 🔲",
    savedText: "LESS IS MORE // MINIMAL DESIGN // FOCUS ON ESSENTIALS",
    fontSize: 20,
    textColor: "#ffffff",
    trackBackground: "#000000",
    fontFamily: "var(--font-inter)",
    fontWeight: "900",
    direction: "r2l",
    speed: 5,
    loopCount: "infinite",
    pauseOnHover: false,
    borderStyle: "none",
    textGap: 5
  }
];

const PRESET_COLORS = [
  "#ffffff", // White
  "#00ffcc", // Neon Cyan
  "#39ff14", // Matrix Green
  "#ff007f", // Neon Pink
  "#ffaa00", // Gold Yellow
  "#9b5de5", // Electric Violet
  "#ef4444"  // Vibrant Red
];

const PRESET_BG_COLORS = [
  "#000000", // Pure Black
  "#0b0c10", // Dark Steel
  "#161616", // Slate Dark
  "#1c1c24", // Navy Blue Gray
  "#22252a", // Charcoal Gray
  "#ffffff"  // High Contrast White
];

export default function Home() {
  // Main text states
  const [inputText, setInputText] = useState("ENTER YOUR CUSTOM TEXT HERE ✦ NUMBERS 1234 ✦ SYMBOLS & @#$! ✦ SAVE AND ANIMATE");
  const [savedText, setSavedText] = useState("ENTER YOUR CUSTOM TEXT HERE ✦ NUMBERS 1234 ✦ SYMBOLS & @#$! ✦ SAVE AND ANIMATE");
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationKey, setAnimationKey] = useState(0); // Trigger re-render of animation track on changes

  // Toggle & Fullscreen states
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Customization states
  const [fontSize, setFontSize] = useState(15);
  const [textColor, setTextColor] = useState("#ffffff");
  const [trackBackground, setTrackBackground] = useState("#000000");
  const [fontFamily, setFontFamily] = useState("var(--font-outfit)");
  const [fontWeight, setFontWeight] = useState("bold");
  const [direction, setDirection] = useState("r2l");
  const [speed, setSpeed] = useState(5); // Range 1 (slow) to 10 (fast)
  const [loopCount, setLoopCount] = useState("infinite");
  const [pauseOnHover, setPauseOnHover] = useState(false);
  const [borderStyle, setBorderStyle] = useState("solid");
  const [textGap, setTextGap] = useState(5);

  // Idle state for auto-hiding
  const [isIdle, setIsIdle] = useState(false);

  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [trackSize, setTrackSize] = useState(1000);

  // Auto-hide controls after 10s of inactivity
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleActivity = () => {
      setIsIdle(false);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsIdle(true), 10000);
    };

    // Initialize the timer
    handleActivity();

    // Listeners for activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keydown", handleActivity);
    window.addEventListener("touchstart", handleActivity);
    window.addEventListener("scroll", handleActivity);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keydown", handleActivity);
      window.removeEventListener("touchstart", handleActivity);
      window.removeEventListener("scroll", handleActivity);
    };
  }, []);

  // Measure track size for dynamic speed calculation
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    
    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      const isVertical = direction === "t2b" || direction === "b2t";
      const size = isVertical ? rect.height : rect.width;
      if (size > 0) setTrackSize(size);
    };
    
    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    
    resizeObserver.observe(el);
    
    return () => resizeObserver.disconnect();
  }, [direction, animationKey]); // Re-run when animationKey creates a new DOM node

  // Click outside drawer closes the active drawer
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        drawerRef.current && 
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Native Fullscreen & Escape key handlers
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(e => console.error(e));
        } else {
          setIsDrawerOpen(false);
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Disable scroll when fullscreen
  useEffect(() => {
    if (isFullScreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullScreen]);

  // Handle saving the input text
  const handleSave = () => {
    setSavedText(inputText || " ");
    setIsSaved(true);
    // Auto start animation on save if desired, or let user click Animate
    // Let's reset the animation key so it restarts fresh
    setAnimationKey(prev => prev + 1);
    
    // Hide saved banner after 3 seconds
    setTimeout(() => {
      setIsSaved(false);
    }, 3000);
  };

  // Convert speed level to a constant pixel-per-second visual speed
  const getDuration = () => {
    if (!trackSize) return 10;
    
    // Min and Max apparent speed in pixels per second
    const minSpeed = 20; 
    const maxSpeed = 1000;
    
    const speedRatio = (speed - 1) / 9; // 0 to 1
    // Using a quadratic scale for finer control at lower speeds
    const currentSpeedPxPerSec = minSpeed + Math.pow(speedRatio, 2) * (maxSpeed - minSpeed);
    
    // Duration needed to move the entire track at the given pixel-per-second speed
    return trackSize / currentSpeedPxPerSec;
  };

  // Handle animation ending (for fixed loops like 1, 2, 3 times)
  const handleAnimationEnd = () => {
    // Once animation finishes its iterations, set playing to false
    setIsPlaying(false);
  };

  // Load a preset
  const loadPreset = (preset: typeof PRESETS[0]) => {
    setInputText(preset.savedText);
    setSavedText(preset.savedText);
    setFontSize(preset.fontSize);
    setTextColor(preset.textColor);
    setTrackBackground(preset.trackBackground);
    setFontFamily(preset.fontFamily);
    setFontWeight(preset.fontWeight);
    setDirection(preset.direction);
    setSpeed(preset.speed);
    setLoopCount(preset.loopCount);
    setPauseOnHover(preset.pauseOnHover);
    setBorderStyle(preset.borderStyle);
    if (preset.textGap !== undefined) setTextGap(preset.textGap);
    
    // Restart animation
    setIsPlaying(true);
    setAnimationKey(prev => prev + 1);
  };

  // Re-key animation whenever properties that change keyframe behavior are altered
  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [direction, loopCount, speed, textGap]);

  // Determine marquee animation direction class
  const getAnimationClass = () => {
    if (!isPlaying) return "";
    switch (direction) {
      case "l2r":
        return styles.animateL2R;
      case "b2t":
        return styles.animateB2T;
      case "t2b":
        return styles.animateT2B;
      case "r2l":
      default:
        return styles.animateR2L;
    }
  };

  return (
    <div className={`${styles.container} ${isFullScreen ? styles.containerFullScreen : ""}`}>
      {/* Main Layout */}
      <main className={`${styles.mainLayout} ${isFullScreen ? styles.mainLayoutFullScreen : ""}`}>
        
        {/* Preview Viewport */}
        <div 
          className={`${styles.viewportContainer} ${isFullScreen ? styles.viewportFullScreen : ""}`} 
          style={{ 
            flex: isFullScreen ? undefined : 1,
            backgroundColor: trackBackground,
            borderStyle: isFullScreen ? "none" : borderStyle,
            borderColor: borderStyle === "none" ? "transparent" : "var(--border-focus)",
            paddingBottom: (!isFullScreen && !isIdle) ? (isDrawerOpen ? "65vh" : "64px") : "0",
            transition: "padding-bottom 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
          }}
        >
          {/* Fullscreen Toggle Button */}
          {!isFullScreen && (
            <button 
              className={styles.fullscreenBtn}
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen().catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                  });
                } else {
                  if (document.exitFullscreen) {
                    document.exitFullscreen();
                  }
                }
              }}
              title="Enter Fullscreen"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          )}

          {/* Scrollable track */}
          <div
            key={animationKey} // Forces React to recreate the DOM node when animation settings change
            className={`${styles.marqueeTrack} ${getAnimationClass()} ${pauseOnHover ? styles.pauseOnHover : ""}`}
            onAnimationEnd={handleAnimationEnd}
            style={{
              color: textColor,
              fontSize: `${fontSize}vh`,
              fontFamily: fontFamily,
              fontWeight: fontWeight,
              flexDirection: (direction === "t2b" || direction === "b2t") ? "column" : "row",
              // Injecting custom CSS variables for animation details
              ["--anim-duration" as any]: `${getDuration()}s`,
              ["--anim-iteration" as any]: loopCount,
              ["--anim-state" as any]: isPlaying ? "running" : "paused"
            }}
          >
            {[1, 2].map((groupIndex) => (
              <div 
                key={groupIndex}
                ref={groupIndex === 1 ? contentRef : null}
                style={{
                  display: "flex",
                  gap: `${textGap}vw`,
                  flexDirection: (direction === "t2b" || direction === "b2t") ? "column" : "row",
                  paddingRight: (direction === "l2r" || direction === "r2l") ? `${textGap}vw` : "0",
                  paddingBottom: (direction === "t2b" || direction === "b2t") ? `${textGap}vw` : "0",
                }}
              >
                {Array.from({ length: 50 }).map((_, i) => (
                  <span key={i}>{savedText}</span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Saved Banner Notification */}
        {!isFullScreen && isSaved && (
          <div className={styles.savedBanner}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Text saved successfully! Ready to animate.
          </div>
        )}

        {/* Trapezoid Bottom Drawer */}
        {!isFullScreen && (
          <div ref={drawerRef} className={`${styles.drawerWrapper} ${isDrawerOpen ? styles.open : styles.closed} ${isIdle ? styles.idleHidden : ""}`}>
            <div className={styles.drawerBackground}></div>

            <button 
              className={styles.dockCircleBtn}
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              title={isDrawerOpen ? "Close Controls" : "Open Controls"}
            >
              {isDrawerOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="18 15 12 9 6 15"></polyline>
                </svg>
              )}
            </button>

            <div className={styles.drawerContentFull}>
              <div className={styles.dashboardGrid}>
                {/* Panel 1: Input & Actions */}
                <section className={styles.panelCardInner}>
                  <h2 className={styles.panelTitle}>1. Edit & Controls</h2>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Input Text
                      <span className={styles.labelValue}>{inputText.length} chars</span>
                    </label>
                    <textarea
                      className={styles.textInput}
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder="Enter text, numbers or symbols..."
                    />
                  </div>

                  <div className={styles.btnGroup}>
                    <button 
                      className={styles.secondaryBtn} 
                      onClick={handleSave}
                      title="Save Text to preview track"
                    >
                      Save Text
                    </button>
                    
                    <button 
                      className={`${styles.primaryBtn} ${isPlaying ? styles.secondaryBtnActive : ""}`} 
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                            <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                          </svg>
                          Pause
                        </>
                      ) : (
                        <>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="5 3 19 12 5 21 5 3"></polygon>
                          </svg>
                          Animate
                        </>
                      )}
                    </button>
                  </div>
                </section>

                {/* Panel 2: Font Typography Settings */}
                <section className={styles.panelCardInner}>
                  <h2 className={styles.panelTitle}>2. Font Styling</h2>

                  {/* Font Family */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Font Family</label>
                    <select 
                      className={styles.selectInput} 
                      value={fontFamily} 
                      onChange={(e) => setFontFamily(e.target.value)}
                    >
                      <option value="var(--font-outfit)">Outfit (Modern Geometric)</option>
                      <option value="var(--font-inter)">Inter (Clean Sans-Serif)</option>
                      <option value="var(--font-geist-mono)">Geist Mono (Developer Tech)</option>
                      <option value="var(--font-playfair)">Playfair Display (Elegant Serif)</option>
                      <option value="&quot;Courier New&quot;, Courier, monospace">System Monospace</option>
                      <option value="Georgia, serif">System Serif</option>
                    </select>
                  </div>

                  {/* Font Weight */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Font Weight</label>
                    <select 
                      className={styles.selectInput} 
                      value={fontWeight} 
                      onChange={(e) => setFontWeight(e.target.value)}
                    >
                      <option value="normal">Normal (400)</option>
                      <option value="bold">Bold (700)</option>
                      <option value="900">Black (900)</option>
                    </select>
                  </div>

                  {/* Font Size Slider */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Font Size
                      <span className={styles.labelValue}>{fontSize}%</span>
                    </label>
                    <input
                      type="range"
                      min="2"
                      max="100"
                      value={fontSize}
                      onChange={(e) => setFontSize(parseInt(e.target.value))}
                    />
                  </div>

                  {/* Text Color Picker */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Text Color</label>
                    <div className={styles.colorPickerWrapper}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                      />
                      <div className={styles.colorPresetGrid}>
                        {PRESET_COLORS.map((c) => (
                          <button
                            key={c}
                            className={styles.colorPresetBtn}
                            style={{ backgroundColor: c }}
                            onClick={() => setTextColor(c)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>

                {/* Panel 3: Marquee & Viewport Controls */}
                <section className={styles.panelCardInner}>
                  <h2 className={styles.panelTitle}>3. Track & Animations</h2>

                  {/* Scrolling Speed Slider */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Scroll Speed
                      <span className={styles.labelValue}>Level {speed}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={speed}
                      onChange={(e) => setSpeed(parseInt(e.target.value))}
                    />
                  </div>

                  {/* Text Gap Slider */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      Gap Distance
                      <span className={styles.labelValue}>{textGap}vw</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      value={textGap}
                      onChange={(e) => setTextGap(parseInt(e.target.value))}
                    />
                  </div>

                  {/* Direction and Loop count in split layout */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Direction</label>
                      <select 
                        className={styles.selectInput} 
                        value={direction} 
                        onChange={(e) => setDirection(e.target.value)}
                      >
                        <option value="r2l">Right → Left</option>
                        <option value="l2r">Left → Right</option>
                        <option value="b2t">Bottom ↑ Top</option>
                        <option value="t2b">Top ↓ Bottom</option>
                      </select>
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Loop Count</label>
                      <select 
                        className={styles.selectInput} 
                        value={loopCount} 
                        onChange={(e) => setLoopCount(e.target.value)}
                      >
                        <option value="infinite">Infinite Loop</option>
                        <option value="1">1 Time</option>
                        <option value="2">2 Times</option>
                        <option value="3">3 Times</option>
                        <option value="5">5 Times</option>
                      </select>
                    </div>
                  </div>

                  {/* Track Background */}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Track Background</label>
                    <div className={styles.colorPickerWrapper}>
                      <input
                        type="color"
                        className={styles.colorInput}
                        value={trackBackground}
                        onChange={(e) => setTrackBackground(e.target.value)}
                      />
                      <div className={styles.colorPresetGrid}>
                        {PRESET_BG_COLORS.map((c) => (
                          <button
                            key={c}
                            className={styles.colorPresetBtn}
                            style={{ backgroundColor: c, border: c === "#ffffff" ? "1px solid #000" : "1px solid var(--border)" }}
                            onClick={() => setTrackBackground(c)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Viewport Border & Pause on Hover Row */}
                  <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "0.75rem", alignItems: "center" }}>
                    <div className={styles.formGroup}>
                      <label className={styles.formLabel}>Border Style</label>
                      <select 
                        className={styles.selectInput} 
                        value={borderStyle} 
                        onChange={(e) => setBorderStyle(e.target.value)}
                      >
                        <option value="solid">Solid Border</option>
                        <option value="dashed">Dashed Border</option>
                        <option value="double">Double Border</option>
                        <option value="none">No Border</option>
                      </select>
                    </div>

                    <div className={styles.toggleWrapper} style={{ marginTop: "1.2rem" }}>
                      <span className={styles.formLabel} style={{ margin: 0 }}>Pause Hover</span>
                      <label className={styles.switch}>
                        <input
                          type="checkbox"
                          checked={pauseOnHover}
                          onChange={(e) => setPauseOnHover(e.target.checked)}
                        />
                        <span className={styles.slider}></span>
                      </label>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
