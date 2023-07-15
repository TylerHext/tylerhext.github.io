---
title: Handwired Keyboard Build
author: Tyler Hext
date: 2023-07-09
tags: [wiring, keyboards]
status: published
---

<a name="introduction"></a>

I set out to build a handwired keyboard to learn soldering, basic circuitry and programming microcontrollers. Along the way I discovered a much larger rabbit hole than I'd expected . While I barely scratched the surface, I've recorded the process for my own reference and hope it's helpful for anyone looking to do something similar.


## Table of Contents

1. [Background](#background)
2. [Tools & Components](#tools-components)
3. [Switch Assembly](#switch-assembly)
4. [Wiring Prep](#wiring-prep)
5. [Soldering](#soldering)
6. [Programming the Controller](#programming-controller)
7. [Testing](#testing)
8. [Final Thoughts](#final-thoughts)
9. [Resources](#resources)


---

## Background <a name="background"></a>

Before attempting this project I had no experience with soldering or circuitry in general, no knowledge of how keyboards work, and some experience programming in Python. I decided to build a keyboard because I was looking for a project where I could learn to program microcontrollers and solder electrical components. I use a keyboard everyday and wanted the fun of using a tool I programmed myself. 

I spent a lot of time reading [tutorials](#resources) to compliment my lack of knowledge and they are the primary reason this keyboard actually works.

## Tools and Components <a name="tools-components"></a>

| Item           | Quantity | Cost USD |
| -------------- | :------: | -------: |
| [Switches](#switches)       |    88    |    $22  |
| [Springs](#springs)        |    88    |    $10  |
| [Keycaps](#keycaps)        |    88    |    $40  |
| [Diodes](#diodes)         |    88    |     $6  |
| [Stabilizers](#stabilizers)    |     6    |     $7  |
| [Controller](#controller)     |     1    |    $13  |
| [Lubricant](#lubricant)      |     1    |    $11  |
| [Plate](#plate)          |     1    |    $14  |
| [Soldering Iron](#soldering-iron) |     1    |    $24  |
| [Solder](#solder)         |     1    |     $9  |
| [Wire](#wire)           |     1    |     $6  |
| [Wire stripper](#wire-stripper)  |     1    |     $7  |
|      **Total**        |          |   **$159**   |

The total is a bit more than I planned to spend but overall not too bad. Ignoring tools/wire/solder which can be used for more projects and springs/lubricant which is optional, you can get the price-per-board down to ~$90.

You can get a solid keyboard from a vendor for like ~$100 so if your goal is to get a nice keyboard for an affordable price it probably doesn't make the most sense to handwire your own board. If your goal is to learn circuitry this was a really fun project for a good price and I definitely recommend it. 

### Switches <a name="switches"></a>
Switches are responsible for registering your keypresses with the microcontroller. They are composed of a top & bottom housing, spring and stem. Variation in the materials and build precision will affect how the keyboard feels and sounds. You can get totally usable switches for ~$0.25/ea or very fancy switches for like $0.85/ea or higher. 

I opted for a lower-cost linear switch mostly because I liked the color, which is definitely the most important factor to consider.

<insert photo of switches here>

[Read more about switch types](https://www.mechanical-keyboard.org/switch-types/)

### Springs <a name="springs"></a>
I elected to install heavier springs in my switches because I prefer a heavier keypress. If you prefer the spring weight that comes with your switches then you don't have to worry about this step. 

Compared to the original springs in the KTT Peach switches these replacements are heavier (67g), longer (19mm) and have a dual-stage spring rate.

INSERT SPRING PHOTO

These make the keys **much** heavier to press so mission accomplished. 

### Keycaps <a name="keycaps"></a>
Probably the most painful part of this build was sifting through hundreds of keycap sets to figure out what would fit my layout and feel good. I knew I wanted to stay low-ish profile and get as much surface area on top of the key as possible. With those requirements in mind I eventually landed on a set of PBT keycaps in XDA profile.

INSERT KEYCAP PHOTO

If you have a fondness for headaches there is no shortage of reading material on keycap [materials](https://www.keyboard.university/100-courses/keycaps-101-ydy8j#:~:text=common%20keycap%20profiles-,Keycap%20Materials,profiles%20like%20KAT%20and%20MT3.) and [profiles](https://preview.redd.it/kld2wynulsq51.png?width=749&auto=webp&s=9ceb85fd038bd56986a3ca44d727a66aee246a73) and [sizes](https://thegamingsetup.com/gaming-keyboard/buying-guides/keyboard-sizes). You can spend a lot of money on these things but don't have to. I ended up purchasing through an Etsy vendor. The material is good quality, some of the printings are slightly wonky but nothing too bad.

### Diodes <a name="diodes"></a>
Diodes allow current to flow in only one direction through them. We need them because [things get weird](https://deskthority.net/wiki/Rollover,_blocking_and_ghosting) if we allow current to travel in both directions when we wire up our matrix. We'll include a diode for every switch so the keyboard behaves how we expect it to. This has the side effect of enabling the elusive [n-key rollover (NKRO)](https://en.wikipedia.org/wiki/Key_rollover) which seems to mostly matter for computer gaming but does sound cool.

The specific diodes we're using are 1N4148 diodes because that's what everyone else uses. 

INSERT DIODE PHOTO

### Stabilizers <a name="stabilizers"></a>

INSERT STABILIZER PHOTO

### Controller <a name="controller"></a>

INSERT CONTROLLER PHOTO

### Lubricant <a name="lubricant"></a>



### Plate <a name="plate"></a>

INSERT PLATE PHOTO

### Soldering Iron <a name="soldering-iron"></a>

INSERT SOLDERING IRON PHOTO

### Solder <a name="solder"></a>

INSERT SOLDER PHOTO

### Wire <a name="wire"></a>

INSERT WIRE PHOTO

### Wire stripper <a name="wire-stripper"></a>

INSERT WIRE STRIPPER PHOTO (and other misc hand tools)


---

## Switch Assembly <a name="switch-assembly"></a>

## Wiring Prep <a name="wiring-prep"></a>

## Soldering <a name="soldering"></a>

## Programming the Controller <a name="programming-controller"></a>

## Testing <a name="testing"></a>

## Final Thoughts <a name="final-thoughts"></a>

## Resources <a name="resources"></a>



