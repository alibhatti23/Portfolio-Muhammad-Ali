---
title: Setting Up MPD and RMPC
draft: false
date: 2025-09-27
description: Learn How to setup MPD and RMPC Completely From Start
categories:
  - tech
tags:
  - tech
  - terminal
  - music
Author: Ahmad Hassan
keywords:
  - MPD music player daemon
  - RMPC terminal music client
  - MPD configuration Linux
  - terminal music player setup
  - Arch Linux MPD
  - PipeWire audio output
  - systemd user service MPD
  - TUI music player
---

![RMPC terminal music player interface](/posts/assets/img-1.webp)

## What is RMPC?

RMPC is a **TUI (terminal UI) client** for MPD. It does _not_ do audio output itself, it just sends commands to MPD. ([mierak.github.io](https://mierak.github.io/rmpc/next/installation "Installation | rmpc - GitHub Pages"))

So the setup has two parts:

1. Install & configure MPD (the server/daemon that plays music)
2. Install & configure RMPC to connect to MPD

---

## Step 1: Install MPD + required clients/tools

On Arch-like systems:

```bash
sudo pacman -S mpd mpc
```

You may also install `ncmpcpp` (another MPD client) for testing. ([ArchWiki](https://wiki.archlinux.org/title/Music_Player_Daemon?utm_source=chatgpt.com "Music Player Daemon - ArchWiki"))

---

## Step 2: Create necessary directories & base config

1. Create configuration directory and subfolders:
    

```bash
mkdir -p ~/.config/mpd/playlists
mkdir -p ~/Music
```

2. Copy the example config (if available) to your user config:
    

On Arch:

```bash
cp /usr/share/doc/mpd/mpdconf.example ~/.config/mpd/mpd.conf
```

Or check `/usr/share/mpd/mpdconf.example`. ([IPv6rs](https://ipv6.rs/tutorial/Arch_Linux/mpd/"How to Install mpd on Arch Linux - IPv6rs"))

3. Open `~/.config/mpd/mpd.conf` in your editor and set the basic paths. Here is a minimal working example:
    

```conf
# Paths (adjust for your username)
music_directory    "/home/ahmad/Music"
playlist_directory "~/.config/mpd/playlists"
db_file            "~/.config/mpd/database"
log_file           "~/.config/mpd/log"
pid_file           "~/.config/mpd/pid"
state_file         "~/.config/mpd/state"
sticker_file       "~/.config/mpd/sticker.sql"

# Audio output block (choose based on your sound system)
audio_output {
    type "pipewire"
    name "MPD PipeWire Output"
}

# Symbolic links behavior
follow_outside_symlinks "yes"
follow_inside_symlinks  "yes"
```

You can also use `type "alsa"` or `type "pulse"` depending on your system. ([ArchWiki](https://wiki.archlinux.org/title/Music_Player_Daemon "Music Player Daemon - ArchWiki"))

---

## Step 3: Fix permissions & ensure everything is accessible

- The MPD process must have **read** access to your music directory and **write** access to the config / database files.
    
- If you run MPD as your user (not as root), make sure `~/Music` and `~/.config/mpd/` are owned by you (or have appropriate permissions).
    
- Ensure that all parent directories have the “execute” bit (so they can be entered).
    
- Avoid running MPD as root. Use the user service. ([ArchWiki](https://wiki.archlinux.org/title/Music_Player_Daemon "Music Player Daemon - ArchWiki"))
    

---

## Step 4: Enable & start MPD (with systemd user unit)

Because MPD provides a user-level systemd service, you can manage it with:

```bash
systemctl --user enable mpd
systemctl --user start mpd
```

You can also use:

```bash
systemctl --user restart mpd
```

To check status:

```bash
systemctl --user status mpd
```

The ArchWiki notes this approach. ([ArchWiki](https://wiki.archlinux.org/title/Music_Player_Daemon "Music Player Daemon - ArchWiki"))

Also note: MPD supports socket activation via `mpd.socket`. You can enable that instead if you prefer MPD to start on demand. ([ArchWiki](https://wiki.archlinux.org/title/Music_Player_Daemon "Music Player Daemon - ArchWiki"))

---

## Step 5: Update MPD’s music database

Once MPD is running successfully, you need to tell it to scan your music directory:

```bash
mpc update
```

Or via a UI client (if it supports “update library”).

Check that the database is populated:

```bash
mpc ls
mpc listall
```

If nothing appears, double-check your `music_directory` path and permissions.

---

## Step 6: Install RMPC

Follow the instructions in RMPC’s docs: ([mierak.github.io](https://mierak.github.io/rmpc/next/installation/ "Installation | rmpc - GitHub Pages"))

If you're on Arch:

```bash
sudo pacman -S rmpc
```

Or build via `cargo` etc.

---

## Step 7: Configure RMPC(Optional)

RMPC needs to know where MPD is (host / port / socket). By default it uses `127.0.0.1:6600`. ([mierak.github.io](https://mierak.github.io/rmpc/next/configuration "General configuration | rmpc - GitHub Pages"))

You can create or edit its config file to set:

```toml
# Example in rmpc config
address = "127.0.0.1:6600"
password = None
```

You may also connect over a UNIX socket if your MPD is configured to use one.

---

## Step 8: Run RMPC & test control

Just run:

```bash
rmpc
```

You should see the TUI, listing songs / playlists etc. You can browse your library, queue songs, play, pause, skip etc.

If it fails to connect, check:

- MPD is running
    
- The host / port / socket is correct
    
- No firewall blocking
    
- If MPD requires a password, set it in RMPC config
    



![RMPC TUI client connected to MPD showing music library](/posts/assets/img-2.webp)

---

## Troubleshooting tips & common pitfalls

- **Port already in use**: If MPD fails to bind TCP port 6600, maybe another MPD is running or socket activation is handling it.
- **Missing directories or files**: Create playlists directory, music folder, etc.
- **Wrong path / username in config**: Be careful with your home path.
- **Permissions**: The MPD process must have access rights.
- **Audio output misconfigured**: If you pick `pipewire`, `pulse`, or `alsa`, ensure your system’s audio pipeline is compatible.
- **Failure on MIDI files**: Some decoder plugins (e.g. wildmidi) may complain if dependencies missing. Usually ignorable if you don’t use MIDI.
