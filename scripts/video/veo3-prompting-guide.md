# Google Veo 3 Prompting Best Practices Guide

## Overview

Google Veo 3 is a state-of-the-art AI video generation model that creates high-quality videos from text prompts. This guide provides comprehensive best practices for crafting effective prompts to maximize the quality and consistency of your generated videos.

## Key Principles

### 1. Specificity Over Generalization

- Always provide detailed, specific descriptions rather than vague concepts
- The more explicit your prompt, the better Veo 3 can understand and execute your vision
- Think like a filmmaker when crafting your prompts

### 2. Structured Prompt Framework

Use this structure for optimal results:

```
[Subject] [Camera Position] in [Location], [Action], [Lighting], [Movement], [Audio]
```

## Essential Prompt Components

### Subject Description

- Be extremely specific about characters, objects, and subjects
- Include physical details, clothing, expressions, and characteristics
- Example: "A woman in her 30s with curly brown hair, wearing a red wool coat, smiling warmly"

### Camera Positioning

- **Always specify camera position explicitly**
- Use the phrase "(that's where the camera is)" for clarity
- Examples:
  - "Camera positioned at eye level looking directly at the subject"
  - "Low angle shot from below looking up at the building"
  - "Over-the-shoulder shot from behind the character"

### Location & Setting

- Provide rich environmental context
- Include time of day, weather, atmosphere
- Specify indoor/outdoor details
- Example: "In a cozy coffee shop with warm lighting, rain visible through large windows"

### Action & Movement

- Describe what's happening in the scene
- Use natural, flowing movement descriptions
- Avoid robotic or mechanical language
- Example: "Walking naturally down a tree-lined path, leaves gently falling around them"

### Lighting

- Specify lighting conditions and mood
- Examples:
  - "Golden hour lighting with warm sunset colors"
  - "Soft studio lighting with gentle shadows"
  - "Dramatic side lighting creating strong contrasts"

## Audio Integration

### Dialogue Formatting

- Use the format: "Speaking directly to camera saying: [dialogue]"
- Keep dialogue under 8 seconds
- Use phonetic spelling for precise pronunciation
- Example: "Speaking to camera saying: Welcome to our beautiful city!"

### Audio Layers

Veo 3 generates native audio, so prompt for:

- **Dialogue**: What characters are saying
- **Ambient sounds**: Environmental audio
- **Music**: Background score or soundtrack
- Example: "Gentle jazz music playing softly in the background, coffee shop ambiance with quiet chatter"

### Subtitle Control

- Add "No subtitles, no text overlay" to prevent unwanted text
- Be explicit about text elements you don't want

## Character Consistency

### Character Reference Sheets

- Create detailed character descriptions and reuse exact wording
- Maintain identical descriptions across multiple generations
- Example template:

```
John: A man in his 40s with short brown hair, wearing a blue denim jacket
and black-rimmed glasses, with a thoughtful expression and slight beard
```

### Continuity Tips

- Save successful character descriptions in a reference document
- Use identical wording for the same characters across different scenes
- Test character consistency with simple prompts before complex scenes

## Advanced Techniques

### Style Specifications

- Specify visual styles explicitly
- Examples:
  - "LEGO animation style"
  - "Claymation with smooth textures"
  - "Anime style with vibrant colors"
  - "Documentary-style handheld camera work"

### Camera Movements

- Describe specific camera motions
- Examples:
  - "Slow zoom in on the subject's face"
  - "Smooth tracking shot following the character"
  - "Gentle pan across the landscape"
  - "Steady handheld camera movement"

### Cinematic Techniques

- Use film terminology for professional results
- Examples:
  - "Shallow depth of field with bokeh background"
  - "Wide establishing shot transitioning to close-up"
  - "Dutch angle for dramatic effect"

## Technical Considerations

### Resolution & Quality

- Default resolution: 1280x720p
- Can be upscaled to 4K using additional tools
- Specify quality requirements in prompts

### Duration Optimization

- Veo 3 is optimized for 8-second micro-narratives
- Plan your content within this timeframe
- Each generation consumes significant credits (150 credits per generation)

### Cost Management

- AI Ultra plan: $250/month with 12,500 credits
- Approximately 83 generations per month possible
- Use Veo 3 Fast for testing and iteration
- Plan prompts carefully before generating

## Common Prompt Patterns

### Basic Scene Template

```
[Character description] [camera position] in [location setting],
[action/movement], [lighting description], [audio elements].
No subtitles, no text overlay.
```

### Dialogue Scene Template

```
[Character description] [camera position] in [location],
speaking directly to camera saying: "[dialogue under 8 seconds]",
[lighting], [background audio]. No subtitles.
```

### Action Scene Template

```
[Subject] [camera movement] in [environment], [specific action],
[dramatic lighting], [matching sound effects], [camera technique].
Professional cinematography. No text overlay.
```

## Example Prompts

### Example 1: Character Introduction

```
Sarah, a confident businesswoman in her 30s with shoulder-length blonde hair
wearing a navy blue blazer, camera positioned at eye level (that's where the camera is)
in a modern glass office with city skyline visible, speaking directly to camera saying:
"Welcome to our quarterly presentation", soft natural lighting from large windows,
quiet office ambiance with distant city sounds. No subtitles, no text overlay.
```

### Example 2: Cinematic Scene

```
A majestic golden retriever running through a meadow of wildflowers,
camera tracking smoothly at ground level (that's where the camera is),
golden hour lighting with warm sunset colors illuminating the scene,
dog's joyful barking and gentle breeze rustling through grass,
shallow depth of field with bokeh background. Professional wildlife cinematography.
```

### Example 3: Product Showcase

```
Sleek silver smartphone rotating slowly on white surface,
camera positioned slightly above at 45-degree angle (that's where the camera is)
in minimal studio setting, smooth 360-degree rotation revealing all angles,
soft studio lighting with gentle shadows, subtle ambient electronic music.
Clean product photography. No text overlay.
```

## Troubleshooting Common Issues

### Inconsistent Results

- Vary your prompts between generations
- Veo 3 produces similar results for identical prompts
- Add small variations to maintain freshness

### Audio Sync Problems

- Place audio descriptions immediately after related actions
- Be specific about timing: "as they walk, footsteps crunching on gravel"

### Character Inconsistency

- Double-check character descriptions are identical
- Create and maintain character reference sheets
- Test with simple scenes before complex narratives

### Unwanted Text Elements

- Always include "No subtitles, no text overlay"
- Be explicit about avoiding text elements

## Best Practices Summary

1. **Be Specific**: Detailed prompts yield better results
2. **Structure Your Prompts**: Follow the recommended framework
3. **Specify Camera Position**: Always include explicit positioning
4. **Plan Audio**: Describe dialogue, ambiance, and music
5. **Maintain Consistency**: Use identical character descriptions
6. **Control Text**: Explicitly prevent unwanted subtitles
7. **Think Cinematically**: Use professional film terminology
8. **Test and Iterate**: Use Veo 3 Fast for experimentation
9. **Manage Costs**: Plan carefully due to credit consumption
10. **Layer Details**: Build rich, multi-dimensional scenes

## Web Video Implementation Guide

**CRITICAL:** Once you've generated your Veo 3 video, proper web implementation is essential for performance and user experience. This pragmatic checklist ensures your background videos work flawlessly in production.

### 1. Keep It Lightweight

| Why it matters                | What to do                                                                                                                                                                                                                                 |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Performance (LCP ≤ 2s)**    | • Encode two sizes: ≈2 MB (1920 × 1080) for ≥ lg screens and ≤ 800 KB (720 × 480) for mobile<br>• Provide modern + fallback codecs:<br>`<source src="hero.av1.webm" type="video/webm">`<br>`<source src="hero.h265.mp4" type="video/mp4">` |
| **Fast first paint**          | • Add `poster="hero.jpg"` so users see a crisp frame while bytes stream<br>• Set `preload="none"` (or `"metadata"` if you need duration) and lazy-load with `loading="lazy"` to avoid bandwidth hogging                                    |
| **Autoplay on every browser** | • Always include `autoplay muted loop playsinline`<br>• Browsers block autoplay only when audio is present or not muted                                                                                                                    |

### 2. Make the Loop Seamless

- **Clip length:** 5–8s is the sweet spot—short enough to stay under 2 MB; long enough to feel natural
- **Edit tip:** End frame must match the first (identical lighting, posture, props) so `loop` feels continuous—especially important with subtle slow-motion
- **Export:** 24 fps is enough; higher fps just bloats size with no perceptual benefit for slow scenes

### 3. Respect Accessibility & User Control

| Concern                    | Implementation                                                                                                                                                                                                           |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Motion sensitivity**     | Wrap the entire `<video>` in a `prefers-reduced-motion` query:<br>`css<br>@media (prefers-reduced-motion: reduce) {<br>  .hero-video { display: none; }<br>}<br>`<br>Disabling motion is recommended over simply pausing |
| **CPU / battery**          | Pause the video when it scrolls out of view with an `IntersectionObserver` (`video.pause()` / `play()`)                                                                                                                  |
| **Contrast & readability** | Apply a semi-transparent overlay (`backdrop-brightness-50`) or use CSS `filter: brightness(.6)` on the video so text passes WCAG AA                                                                                      |

### 4. Deliver Responsively

```html
<video
  class="absolute inset-0 h-full w-full object-cover"
  autoplay
  muted
  loop
  playsinline
  preload="none"
  poster="hero.jpg"
>
  <source src="hero.av1.webm" type="video/webm" />
  <source src="hero.h265.mp4" type="video/mp4" />
</video>
```

- **object-fit:** `cover` keeps the video filling the area on any aspect ratio
- **Picture-in-picture prevention:** omit controls so browsers don't surface PiP
- **FCP on 3G:** serve a static hero (`<picture>`) on slow-connection hint (`navigator.connection.effectiveType`)

### 5. Pre-Production Planning for Veo 3

When crafting your Veo 3 prompts, consider these web implementation requirements:

#### Loop-Friendly Prompting

```
Add to your prompts: "smooth continuous motion that loops seamlessly,
ending in identical position to starting frame"
```

#### Web-Optimized Movement

```
Avoid: "fast action sequences, rapid camera movements, complex particle effects"
Prefer: "gentle, flowing movements, subtle camera motion, organic transitions"
```

#### Performance-First Composition

```
Include: "simple composition with clear focal point, minimal background complexity,
even lighting throughout sequence"
```

### 6. Checklist Before Shipping

1. ✅ Under 2 MB desktop / 800 KB mobile
2. ✅ `autoplay muted loop playsinline` present
3. ✅ Tested with `prefers-reduced-motion`
4. ✅ Poster image set + lazy-loaded
5. ✅ Contrast overlay passes WCAG AA
6. ✅ Pauses when off-screen
7. ✅ Served from CDN with `cache-control: public, max-age=31536000`
8. ✅ Loop tested for seamless transition
9. ✅ Mobile version loads under 800 KB
10. ✅ Fallback static image for slow connections

### 7. Optimized Veo 3 + Web Video Workflow

Based on production research, this is the most efficient pipeline:

#### Quick Ubuntu Setup

```bash
# Install complete toolchain (Ubuntu 22.04+)
sudo apt update && sudo apt install -y ffmpeg gpac

# Verify SVT-AV1 support (5-10x faster than libaom-av1)
ffmpeg -codecs | grep libsvtav1
```

#### Production Workflow

1. **Generate** with web-optimized prompts (seamless loops, ≤8 seconds)
2. **Download** raw video from Veo 3
3. **Encode** with research-proven settings:

   ```bash
   # Use optimized script
   ./encode_web_video_optimized.sh veo3_video.mp4

   # Or manual commands:
   # 1. Trim & add loop fades
   ffmpeg -i raw.mp4 -ss 0 -t 8 -vf "fade=t=out:st=7.7:d=0.3,fade=t=in:st=0:d=0.3" -an clip.mov

   # 2. Encode AV1/WebM (modern browsers)
   ffmpeg -i clip.mov -c:v libsvtav1 -preset 6 -crf 38 -g 192 -b:v 0 hero.av1.webm

   # 3. Encode H.265/MP4 (Safari + fallback)
   ffmpeg -i clip.mov -c:v libx265 -preset medium -crf 26 -tag:v hvc1 -movflags +faststart hero.h265.mp4

   # 4. Extract poster frame
   ffmpeg -i clip.mov -vf "select=eq(n\,0)" -q:v 2 hero.jpg
   ```

4. **Test** loop seamlessness: `ffplay -loop 0 hero.av1.webm`
5. **Verify** file sizes (≤2MB) and bitrates (≤1.5Mbps for 3G)
6. **Deploy** with CDN and cache headers

#### Key Research Findings

- **SVT-AV1 > libaom-av1**: 5-10× encoding speed improvement
- **Two formats sufficient**: AV1/WebM + H.265/MP4 covers all browsers
- **CRF sweet spots**: AV1 CRF 38, H.265 CRF 26 for optimal size/quality
- **Safari compatibility**: Requires `-tag:v hvc1` for H.265
- **Perfect loops**: 0.3s fade in/out prevents flash artifacts

Follow these practices and your Veo 3 videos will look professional, stay accessible, and never impact performance.

## Resources and References

- [Replicate Veo 3 Guide](https://replicate.com/blog/using-and-prompting-veo-3)
- [Google DeepMind Veo Documentation](https://deepmind.google/models/veo/)
- [Vertex AI Video Generation Guide](https://cloud.google.com/vertex-ai/generative-ai/docs/video/video-gen-prompt-guide)
- [MDN Video Element Documentation](https://developer.mozilla.org/en-US/docs/Web/API/HTMLVideoElement)
- [Web.dev Lazy Loading Video](https://web.dev/articles/lazy-loading-video)
- [Smashing Magazine: Respecting Motion Preferences](https://www.smashingmagazine.com/2021/10/respecting-users-motion-preferences/)

---

_This guide covers Veo 3 prompting and web implementation best practices as of 2024. Both AI generation and web standards continue evolving._

