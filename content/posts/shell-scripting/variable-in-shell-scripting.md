---
title: Variables in Shell Scripting
draft: false
date: 2025-09-30
description: Learn About Variables in Shell Scripting
categories:
  - tech
tags:
  - tech
  - shell
  - scripting
Author: Ahmad Hassan
keywords:
  - shell scripting variables
  - bash variables tutorial
  - environment variables Linux
  - positional parameters bash
  - shell quoting rules
  - read command bash
  - special parameters shell
  - export variable bash
  - bash user input
---

# Variables in Shell Scripting

- Variables are **placeholders to store data** (strings, numbers, paths, etc).
- They don’t require explicit declaration type (untyped).
- Stored as **strings by default** in bash/sh.

## Creating Variables

```bash
name="Ahmad"
age=20
```

**Note:** ⚠️ No spaces around =.

## Using Variables

```bash
echo $name
echo "I am $age years old"
```

- `$var` → expands value(referencing the value of a variable)
- `${var}` → safer form, avoids ambiguity, and useful for appending

```bash
file="report"
echo "${file}_2025.txt"   # report_2025.txt
```

## Types of Variables

#### User-defined variables (you create)

```
city="Multan"
```

#### Environment variables (system-wide, inherited by child processes)

```bash
echo $PATH
export MYVAR="hello"
```

**Best Practices**
- Use uppercase for environment vars (`PATH`, `HOME`)
- Use lowercase for local script vars (`count`, `name`)
- Quote variables to avoid word-splitting
  - `echo "$path"`

## Read-only Variables

```bash
readonly pi=3.1415
pi=4   # error
```

Also you can use the `declare -r variable_name` to make constant.

```bash
declare -r age=30
```

## Delete variable and List Variable

**List All Variables**

```bash
set
```

It will display all variables

**Delete a Variable**

```bash
unset variable_name
```

## Quoting

### Single Quotes (`' '`)

- Everything inside **single quotes** is taken **literally**.
- Variables, command substitution, and escape sequences **do not work**.
- You cannot put a literal single quote `'` inside single quotes (unless you end and restart quoting or escape cleverly).

**Example:**
```bash
echo 'Hello $USER'
```

**Output:**
```bash
Hello $USER
```

(Here `$USER` is **not expanded**.)


### Double Quotes (`" "`)

- Double quotes are **partially literal**.
- Special characters like `$`, `` ` ``, and `\` are still interpreted.
- Variables and command substitution **are expanded**.
- Good choice when you want text with spaces but still allow variable substitution.

**Example:**
```bash
echo "Hello $USER"
```

**Output (suppose user is `ahmad`):**
```bash
Hello ahmad
```

**Another example with command substitution:**
```bash
echo "Today is $(date)"
```

**Output**:
```bash
Today is Mon Sep 09 22:20:15 PKT 2025
```


### Escape Character (`\`)

- Backslash **escapes** the next character, meaning it loses its special meaning.
- Useful to print characters like `$`, `"`, `'`, `\`, or space.

**Example**:

```bash
echo "Hello \"World\""
# Output:
Hello "World"


echo \$HOME
# Output:
$HOME # (Instead of expanding it, it prints literally.)
```

**Rule of Thumb**
- Use **single quotes** when you want **exact literal text**.
- Use **double quotes** when you want **variables and commands to expand**.
- Use **backslash** for **one-off escapes**.


## Environment and Shell Local Variables

### Local (Shell) Variables

- Exist **only in the current shell session** (not inherited by child processes).
- They disappear when the shell is closed.
- Default when you create variables with `VAR=value` without exporting.

**Example**:

```bash
MYVAR="hello"
echo $MYVAR
# hello

bash   # open a subshell
echo $MYVAR
# (nothing printed, variable not passed)
exit
```

✔ Local to the shell, not shared with subshells or programs.

- User configuration file: ~/.bashrc ~/.zshrc
- System-wide configuration file: /etc/bash.bashrc and /etc/profile

### Environment Variables

- Variables that are **exported** to child processes.
- Used by system programs, shells, and user applications.
- Example: `PATH`, `HOME`, `USER`, `LANG`.

**Create/Export an Environment Variable**

```bash
export MYVAR="hello"
bash   # new subshell
echo $MYVAR
# hello
```

Save them permanently add them to your `.bashrc` or `.zshrc` etc file. 

### Commands for Working with Variables

`set`
- Lists all variables (local + environment + shell functions).

```bash
set
```

`printenv` or `env`
- Shows only **environment variables**.

```bash
printenv
env
```

`export`
- Marks a variable as environment.

```bash
MYVAR="ahmad"
export MYVAR
```

### Special Variables (Shell Built-ins)

- `$0` → Script name
- `$1`, `$2` → Positional parameters (arguments to script)
- `$#` → Number of arguments
- `$$` → PID of current shell
- `$?` → Exit status of last command
- `$USER`, `$HOME`, `$PATH` → Common environment variables

### Key Differences

| Feature      | Local Variable        | Environment Variable                                 |
| ------------ | --------------------- | ---------------------------------------------------- |
| Scope        | Only in current shell | In current shell + subshells                         |
| Created with | `VAR=value`           | `export VAR=value` or `export VAR`                   |
| Lifetime     | Ends when shell exits | Ends when shell exits (but survives in child shells) |
| Examples     | `MYVAR`, `counter`    | `PATH`, `HOME`, `USER`, `LANG`                       |

## Getting User Input in Shell

### The `read` Command

- Syntax:

```bash
read [options] variable_name
```

- Reads one line of input from the user and stores it into a variable.
- If no variable is provided, input goes into the built-in variable `REPLY`.

**Basic Example**:

```bash
#!/bin/bash
echo "Enter your name:"
read NAME
echo "Hello $NAME"

# Output
Enter your name:
Ahmad
Hello Ahmad
```

### Using `REPLY` (Default Variable)

If no variable is given:

```bash
echo "Enter something:"
read
echo "You typed: $REPLY"
```

### Prompting Without `echo` (Using `-p`)

Instead of writing a separate `echo`, you can directly prompt:

```bash
read -p "Enter your age: " AGE
echo "You are $AGE years old"
```

### Silent Input (For Passwords) with `-s`

Doesn’t display what the user types.

```bash
read -sp "Enter password: " PASS
echo
echo "Password saved (hidden)"
```


### Multiple Inputs in One Line

You can read multiple values at once:

```bash
read -p "Enter first and last name: " FIRST LAST
echo "First: $FIRST, Last: $LAST"

# Input
Ahmad Hassan

# Output
First: Ahmad, Last: Hassan
```

### Useful Options Summary

| Option | Meaning                 |
| ------ | ----------------------- |
| `-p`   | Prompt inline           |
| `-s`   | Silent (hide input)     |
| `-t N` | Timeout after N seconds |
| `-n N` | Read N characters only  |
| `-a`   | Store words into array  |

**Rule of Thumb**
- Use `read -p` for interactive scripts.
- Use `read -s` for sensitive info.
- Combine options for flexibility.


## Positional Parameters

### What are Positional Parameters?
- Arguments passed to a script or program from the command line are called **positional parameters**.
- They are referenced by numbers (`$1`, `$2`, `$3`, …).
- Each argument is separated by spaces (default **IFS = Internal Field Separator**).

**Example:**

```bash
./myscript.sh file.txt dir1 192.168.1.1
```

- `$0` → script name (`./myscript.sh`)
- `$1` → first argument (`file.txt`)
- `$2` → second argument (`dir1`)
- `$3` → third argument (`192.168.1.1`)

### Accessing Positional Parameters

- `$n` gives the **nth argument**.
- `{}` is required for arguments after `$9`.
   - `$9` → ninth argument
   - `${10}` → tenth argument
   - `${11}` → eleventh argument

### Default Values for Parameters

If a parameter is missing, you can provide a **default value** with syntax:

```bash
${n:-default_value}
```

**Example:**

```bash
echo "First argument: ${1:-ABC}"
```

- If `$1` is given → it prints the actual argument.
- If `$1` is missing → it prints `"ABC"`.

### 4. `$0` Special Parameter

- `$0` → the name of the script as it was invoked.
- Useful for script self-identification.

### Example Script: Displaying Positional Parameters

```bash

#!/bin/bash

echo "Script name: $0"
echo "First argument: ${1:-NoArg1}"
echo "Second argument: ${2:-NoArg2}"
echo "Third argument: ${3:-NoArg3}"

```

**Run:**

```bash
./script.sh A B
```

**Output:**

```bash
Script name: ./script.sh
First argument: A
Second argument: B
Third argument: NoArg3
```


### Practical Example: Display and Compress Script

```bash
#!/bin/bash
# display_and_compress.sh

echo "Displaying the contents of $1"
sleep 2
cat "$1"

echo
echo "Compressing $1..."
sleep 2
tar -cjvf "$1.tar.gz" "$1"

echo "Done! Archive created: $1.tar.gz"
```



## What Are Special Parameters?

- **Special parameters** are variables provided by the shell that hold important information.
- You **cannot assign values** to them, only read them.
### Common Special Parameters

### `$0`

- Expands to the **name of the shell script** being executed.
- Example:

```bash
echo "Script name is $0"
```

Output:

```
Script name is ./myscript.sh
```

### `$#`

- Expands to the **number of positional parameters (arguments)** passed to the script.
- Example:

```bash
./myscript.sh a b c
echo "Arguments count: $#"
```

Output:

```
Arguments count: 3
```

### `$@` and `$*`

- Both expand to **all positional parameters**.
- Subtle difference when quoted:

| Expression | Behavior                                                                        |
| ---------- | ------------------------------------------------------------------------------- |
| `$@`       | Expands each argument as a **separate word**. Useful in loops.                  |
| `$*`       | Expands all arguments as **a single word** (joined with IFS, default is space). |

Example:

```bash
./myscript.sh "a b" c

for arg in "$@"; do echo "[$arg]"; done
# [a b]
# [c]

for arg in "$*"; do echo "[$arg]"; done
# [a b c]
```

### `$?`

- Expands to the **exit status** of the most recent command.
- `0` = success, non-zero = error.

Example:

```bash
ls /etc
echo $?
# 0

ls /notexist
echo $?
# non-zero (error)
```

### `$$`

- Expands to the **process ID (PID)** of the current shell.
- In a **subshell**, it still expands to the PID of the **invoking shell** (not the subshell).

Example:

```bash
echo "Shell PID is $$"
```

### Exit Status Convention (`$?`)

- Every command returns a status code:
   - `0` → success
   - Non-zero → error

Examples:

```bash
ls
echo $?   # 0

cat /etc/shadow
echo $?   # Non-zero (permission denied)

unknowncommand
echo $?   # Non-zero (command not found)
```

### Quick Summary Table

| Parameter | Meaning                                            |
| --------- | -------------------------------------------------- |
| `$0`      | Name of the script                                 |
| `$#`      | Number of arguments                                |
| `$@`      | All arguments (each separately, preserves quoting) |
| `$*`      | All arguments (as a single word)                   |
| `$?`      | Exit status of last command                        |
| `$$`      | PID of current shell                               |


**Rule of Thumb**

- Use `$0` for script name, `$#` to check argument count, `$@` for iterating arguments, `$?` to check success/failure, and `$$` for PID when scripting background tasks or logs.

## # `$@` vs `$*` in Shell Scripting

Both `$@` and `$*` expand to **all positional parameters** (`$1`, `$2`, `$3`, …).  
The key difference appears when they are **quoted**.


### `$@` (All Positional Parameters)

- Expands to all arguments **starting from `$1`**.
- **Unquoted `$@`** → behaves like `$1 $2 $3 …`.
- **Quoted `"$@"`** → preserves each argument as a separate quoted string.
   - Equivalent to `"$1" "$2" "$3" …`.
   - Prevents **word splitting** inside arguments.

**Example:**

```bash
#!/bin/bash
for arg in "$@"; do
    echo "[$arg]"
done
```

**Run:**

```bash
./script.sh "my file.txt" report.txt doc.pdf
```

**Output:**

```bash
[my file.txt]
[report.txt]
[doc.pdf]
```

**Note:** Each argument remains intact, even with spaces.


### `$*` (All Positional Parameters)

- Expands to all arguments as a **single string**.
- **Unquoted `$*`** → same as unquoted `$@` → `$1 $2 $3 …` (word splitting occurs).
- **Quoted `"$*"`** → treats all parameters as **one single string**, joined together.
   - The separator used is the **first character of IFS (Internal Field Separator)**.
   - By default, IFS = space, so arguments are joined with spaces.

**Example:**

```bash
#!/bin/bash
echo "Using \"\$*\":"
for arg in "$*"; do
    echo "[$arg]"
done
```


**Run:**

```bash
./script.sh "my file.txt" report.txt doc.pdf
```

**Output:**

```bash
[my file.txt report.txt doc.pdf]
```

All arguments combined into **one string**.

### Word Splitting Issue Example

```bash
#!/bin/bash
touch $@
```

**Run:**

```bash
./script.sh "my file.txt" "your report.txt" "his document.txt"
```

  - Without quotes, $@ = my file.txt your report.txt his document.txt
  -  This causes 6 files to be created instead of 3 (my, file.txt, yourreport, txt, …).

Fix with quoting:

```bash
touch "$@"
```

Now only 3 files are created correctly.
