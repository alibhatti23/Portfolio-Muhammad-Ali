---
title: Introduction to Shell Scripting
draft: false
date: 2025-09-30
description: Learn Shell Scripting From Scratch and Dive Deep Into Scripting
categories:
  - tech
tags:
  - tech
  - shell
  - scripting
keywords:
  - shell scripting tutorial
  - bash scripting for beginners
  - Linux shell commands
  - shebang explained
  - PATH environment variable
  - bash vs sh vs zsh
  - how to write shell scripts
  - shell script execution methods
Author: Ahmad Hassan
---

# Shell Scripting

A shell script is an executable text file that contains shells commands and other specific programming structures.
## What is a Shell?

- A **shell** is a program that acts as a bridge(interface) between you(user) and the operating system(kernel).
- It takes commands you type, sends them to the operating system kernel, and then shows you the output.
- Think of it as a **command interpreter**.

**Tip:** Use this command to check your current shell

```bash
# Method-1
echo $0
#Method-2
echo $SHELL
```

## What is Bash?

- **Bash** stands for **Bourne Again SHell**.
- It is one specific type of shell, widely used in Linux and macOS.
- It adds features like command history, tab completion, scripting support, etc.
- Other shells exist (`sh`, `zsh`, `fish`), but Bash is the most common.

**Tip:** Check all shells in your system 

```bash
cat /etc/shells
```

**Tip:** You can change your shell by using the following 

```bash
chsh -s /path/to/shell
# Example
chsh -s /bin/bash
```

## What is a Terminal?

- A **terminal** is the program you open to interact with the shell.
- Examples: GNOME Terminal, Kitty (which you use), Alacritty, Ghostty.
- The terminal itself does not understand commands. It just provides a **window** for you to type in, and then it forwards what you type to the shell.
👉 Relationship:
- **Terminal** → Window/Interface
- **Shell** → Program running inside terminal
- **Bash** → One type of shell

## Create First Script

A script is just a **text file with commands** written in order.

1. Create a file:

```bash
vim hello.sh
```

2. Add the **shebang** (tells the system which interpreter to use):

```bash
#!/bin/bash
echo "Hello, World!"
```

3. Make it executable:

```bash
chmod +x hello.sh
```

4. Run it:

```bash
# Method-1
./hello.sh
# Method-2
bash hello.sh
```

## PATH in Shell

- `PATH` is an environment variable that stores directories where the shell looks for executable commands.
- **Format**: Colon-separated list of directories.  

 **Example:**
 
```bash
echo $PATH
/usr/local/bin:/usr/bin:/bin:/usr/local/sbin:/usr/sbin:/home/user/bin
```

**Usage**: When you type a command like `ls`, the shell searches for it in directories listed in `PATH`.

### Working with PATH

- **View PATH**

```bash
echo $PATH
```

- **Temporarily add a directory** (only in current session)

```bash
# Syntax
export PATH=$PATH:/path/to/dir_file

#Example
export PATH=$PATH:/home/user/scripts
```

Not I don't used the `""` because there is not between them but good to use them.

- **Permanently add** (add to `~/.bashrc`, `~/.zshrc`, or `~/.profile`)

```bash
export PATH="$PATH:/opt/custom/bin"
```


- **Run script without changing PATH**

- Use relative path: `./myscript.sh`
- Use absolute path: `/home/user/scripts/myscript.sh`


## What is a Shebang (`#!`)?

- The **shebang** is the first line in a script, written as `#!`.
- It tells the system **which interpreter** should run the file.

- Example:

```bash
#!/bin/bash
```

**Note:** Without shebang, the system may use the default shell (sometimes `/bin/sh`), which can behave differently from Bash.

**Tip:** # (hash) !(exclamation/bang) combine become  hash bang so the sort term is shebang
## Why Shebang is Important?

- Ensures your script runs in the correct shell, no matter who runs it.
- Makes scripts **portable** and **predictable**.
- Example:
  - `#!/bin/bash` → Runs with Bash.
  - `#!/bin/sh` → Runs with default POSIX shell.
  - `#!/usr/bin/env python3` → Runs with Python.

**Example**

```bash
#!/usr/bin/python3
import sys 
print(sys.version)
print("Hello World")
```

This is python code but the python3 interpreter is used because the shebang tell the used that one.

## Comments in Shell Scripts

- **Purpose**: Add explanations, notes, or disable code without execution.
- **Symbol**: `#` (hash). Everything after `#` on a line is ignored by the shell.
### Types of Comments

1. **Single-line comment**

```bash
# This is a single-line comment
echo "Hello"  # Inline comment after a command
```

2. **Multi-line comment (common hack)** 

```bash
: '
This is a multi-line comment
It can span across lines
'
```

(Uses `:` which is a no-op command, followed by a quoted block)


## Different Way to Run the Script
### 1. `./script.sh`

- Runs the script as a separate executable program.
- Requires **execute permission** (`chmod +x script.sh`).
- Uses the **shebang line (`#!`)** at the top of the script to decide which interpreter runs it.
- Runs in a **new shell process**, so variables/functions don’t affect the current shell.

```bash
./script.sh
```

---

### 2. `source script.sh` (or `. script.sh`)

- Reads and executes the script **inside the current shell**.
- No need for execute permission.
- Ignores the shebang, always runs in the **current shell**.
- Any variables/functions defined in the script stay available after it finishes.

```bash
source script.sh
```

### 3. `bash script.sh`

- Runs the script using the `bash` interpreter explicitly.
- Doesn’t require execute permission.
- Runs in a **new shell process** (like `./script.sh`).
- Ignores the shebang, always uses bash.

```bash
bash script.sh
```

### Quick Comparison Table

| Command            | Needs `chmod +x`? | Uses Shebang?      | Runs in new shell? | Variables persist? |
| ------------------ | ----------------- | ------------------ | ------------------ | ------------------ |
| `./script.sh`      | ✅ Yes             | ✅ Yes              | ✅ Yes              | ❌ No               |
| `source script.sh` | ❌ No              | ❌ No               | ❌ No (same shell)  | ✅ Yes              |
| `bash script.sh`   | ❌ No              | ❌ No (always bash) | ✅ Yes              | ❌ No               |

⚡ Rule of thumb:

- Use `./script.sh` for normal scripts.
- Use `source script.sh` only when you want to load functions/variables into your current shell session.
- Use `bash script.sh` when you want to force bash, ignoring the shebang.

### Steps of Command Processing

1. **Read Input**
   - From **terminal** (interactive use) or **file/script**.
   - Reads line by line.
2. **Tokenization (Lexical Analysis)**
   - Breaks input into **words and operators**.
   - Follows specific **syntax rules**.
   - **Alias expansion** happens at this stage.
3. **Parsing / Command Identification**
   - Tokens are recognized as:
   - **Simple commands** (like `ls -l`)
   - **Compound commands** (like `if`, `for`, pipelines, etc.)
4. **Shell Expansions** (performed in order):
   -  **Brace expansion** → `{a,b,c}` → expands to `a b c`
   -  **Tilde expansion** → `~` → expands to home directory
   -  **Parameter & variable expansion** → `$VAR`
   -  **Command substitution** → `` `command` `` or `$(command)`
   -  **Arithmetic expansion** → `$((2+3))` → `5`
   -  **Process substitution** → `<(command)` or `>(command)`
   -  **Word splitting** → breaks expanded words into fields
   -  **Filename expansion (globbing)** → `*.txt` → matches files
5. **Quote Removal**
   - Removes `"` `'` and `` ` `` while preserving meaning.
6. **Redirections**
   - Handles input/output redirection, e.g. `>` `>>` `<` `2>&1`.
7. **Execution**
   - The command is executed.
   - If required, the shell waits for the command to finish.
   - Exit status (`$?`) is collected.