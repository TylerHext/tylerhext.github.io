---
layout: post.njk
title: Bike Light Hacking
created: 2024-04-06
updated: 2026-01-23
thumbnail: /assets/images/light-mounted-bike.png
tags: [tech, cycling]
---

Converting a Bontrager Flare 1 bicycle tail light from disposable AAA batteries to rechargeable lithium power.

---

## components

**Light:** [Bontrager Flare 1](https://www.trekbikes.com/us/en_US/equipment/bike-accessories/bike-lights/bike-rear-lights/bontrager-flare-1-rear-bike-light/p/11367/) tail light with 3x AAA battery compartment

![Bontrager Flare 1 circuit board](/assets/images/light-circuit.jpeg)

**Battery:** 3.7v lithium cell salvaged from disposable vaporizer

![Lithium battery extracted from disposable vaporizer](/assets/images/raw-battery.jpeg)

**Charging module:** TP4056 lithium battery charging board with USB micro port, overcharge/discharge protection, and status LEDs

![TP4056 charging module](/assets/images/tp4056.png)

## technical specifications

- Original voltage (3x AAA): ~2.9v
- Lithium cell voltage: ~3.1v
- Original housing IPX4 rating preserved

## process

1. Disassemble light (lens, circuit board, battery compartment)
2. Test voltage compatibility with alligator clips
3. Solder TP4056 OUT +/- to light circuit board +/- terminals
4. Dremel battery compartment to fit lithium cell
5. Wire lithium cell to TP4056 BATT +/-
6. Reassemble housing with modified components

![Test fit with alligator clips](/assets/images/test-fit.jpeg)

## charging

Remove battery compartment, plug in USB cable. Blue LED indicates full charge.

![Light charging via USB](/assets/images/light-charging.jpeg)

---
## updates
### 2026 January

Over 2000 miles logged on this light so far with no issues. 

## resources

- [Disposable vapes - repurposing the crappiest invention](https://atkosite.wordpress.com/2023/01/17/disposable-vapes-repurposing-the-crappiest-invention/)
- [How to Reuse Disposable Vape Lithium Batteries](https://www.instructables.com/How-to-Reuse-Disposable-Vape-Lithium-Batteries/)
- [r/AskElectronics](https://www.reddit.com/r/AskElectronics/)
