---
title: MS SQL Server and Azure Data Studio on Arch Linux
draft: false
date: 2025-04-15
description: Installing MS SQL Server and Azure Data Studio on Arch Linux using Docker.
categories:
  - tech
tags:
  - tech
  - sql
  - database
Author: Ahmad Hassan
keywords:
  - MS SQL Server Arch Linux
  - Azure Data Studio installation
  - SQL Server Docker container
  - Docker SQL Server setup
  - Arch Linux database server
  - SQL Server Linux installation
  - Azure Data Studio AUR
  - Docker MSSQL configuration
---

Installing MS SQL Server along with Azure Data Studio on Arch Linux requires a combination of Microsoft packages and some extra tweaks since SQL Server isn't natively available for Arch and Azure Data Studio is mainly targeted for Debian/Red Hat based distros.

## Step 1: Install Azure Data Studio

Azure Data Studio is available via AUR.

```bash
yay -S azuredatastudio-bin
```

This installs the latest prebuilt version from Microsoft.

### Option 2: Manual (optional)

If you want to manually install:

1. Download .tar.gz from Azure Data Studio official packages
2. Extract it:

```bash
tar -xvzf azuredatastudio-linux-x64.tar.gz
cd azuredatastudio-linux-x64
./azuredatastudio
```

## Step 2: Install Microsoft SQL Server (Docker Method – Recommended)

Microsoft SQL Server is not supported natively on Arch, but the Docker container is fully functional and easiest to manage.

1. Install Docker if you haven’t:

```bash
sudo pacman -S docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
newgrp docker

```

2. Pull SQL Server Image:

```bash
docker pull mcr.microsoft.com/mssql/server:2022-latest
```

3. Run the Container:

```bash
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=YourStrong!Passw0rd" \
   -p 1433:1433 --name sql_server \
   -d mcr.microsoft.com/mssql/server:2022-latest
```

**Note**: Make sure to use a strong password (uppercase, lowercase, number, symbol, and >8 characters).

## Step 3: Connect SQL Server to Azure Data Studio

1. Launch Azure Data Studio.
2. Click on New Connection.
3. Fill out the fields:

- Server: `localhost`
- Authentication: `SQL Login`
- User: `sa`
- Password: `YourStrong!Passw0rd`

4. Hit **Connect**

## Step 4: (Optional) Autostart Docker with Hyprland

If you want SQL Server to start with your system:

```bash
sudo systemctl enable docker
```

Or add a Hyprland hook to start the container at login:

```bash
docker start sql_server
```

## Conclusion

You now have a fully functional SQL Server instance running on Arch Linux via Docker, and you can manage it using Azure Data Studio. This setup allows you to leverage the power of SQL Server without needing to run a full Windows environment.
