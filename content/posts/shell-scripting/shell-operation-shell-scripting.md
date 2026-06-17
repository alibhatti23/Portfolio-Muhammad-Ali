---
title: Shell Operation in Shell Scripting
draft: false
date: 2025-09-30
description: Learn Shell Expansion From Scratch and Dive Deep Into Scripting
categories:
  - tech
tags:
  - tech
  - shell
  - scripting
Author: Ahmad Hassan
keywords:
  - shell operation bash
  - bash tokenization
  - shell command processing
  - bash redirections
  - stdin stdout stderr
  - shell command identification
  - bash pipe tee command
  - shell scripting fundamentals
  - file descriptors Linux
---
## Shell Operation in Bash 
---

- The shell (e.g., **bash**) follows a **multi-step process** to interpret and execute commands.
- Each command goes through reading, breaking down, expanding, redirecting, and finally execution.

## Steps of Command Processing

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
### Key Points

- **Tokenization** is the first transformation stage.
- **Expansions are ordered**; each depends on the result of the previous.
- **Redirection happens before execution**.
- **Exit status** is important for scripting (conditional logic).



## Shell Tokenization
---

- **Definition:** The process of breaking input into **tokens** (smallest meaningful units).
- A **token** = sequence of characters treated as a **single unit** by the shell.

### How Tokenization Works

1. **Input Source**
   - From terminal or a file (script).
2. **Meta Characters**
   - Special **unquoted** characters that separate words.
   - **List of meta characters:**
       - Space ( )
       - Tab (`\t`)
       - Newline (`\n`)
       - `| & ; ( ) < >`
3. **Types of Tokens**
   - **Words:** tokens without unquoted meta characters.
   - **Operators:** tokens containing at least one unquoted meta character.

**Note:** If quoted, they lose their special meaning.

### Operators

1. **Control Operators** → Perform control functions.
   - Examples: `; & && || | |& ( ) \n`
2. **Redirection Operators** → Redirect input/output.
   - Examples: `> >> < << <<< >& <& >|`

![Shell tokenization process showing tokens and operators](/1-Notes/Shell%20Scripting/assets/img.webp)

⚠️ Operators matter **only if unquoted**.

### Alias Expansion

- Aliases are expanded **at this step**, during tokenization.

### Example Walkthrough

Command:

```bash
ls $Home > Home.txt
```

1. **Identify meta characters**
   - Only spaces ( ) here.
2. **Split into tokens (4 tokens):**
   - `ls`
   - `$Home`
   - `>`
   - `Home.txt`
3. **Classify tokens:**
   - Words → `ls`, `$Home`, `Home.txt`
   - Operator → `>` (redirection)
4. **Hidden Control Operator:**
   - Newline (`\n`) at the end of the command.
### Key Points to Remember

- `$` is **not** a meta character → `$Home` counts as a word.
- Redirection operators (`>`, `<`) do not split commands, but **control operators** (`;`, `&&`, newline) do.
- **Tokenization always happens before parsing and expansions.**


## Shell Command Identification

### After Tokenization

- Shell now **classifies tokens** into **simple** or **compound commands**.
### Simple Commands

- **Definition:** Sequence of words separated by spaces, terminated by **newline** or a **control operator**.
- **Structure:**
   - First word → **command name**.
   - Remaining words → **arguments**.
- **Examples:**

```bash
touch a.txt b.txt c.txt
```

   - `touch` = command name
   - `a.txt b.txt c.txt` = arguments
   - Terminated by invisible newline.

### ⚠️ Important Notes

- If multiple commands are written without control operators, shell may treat them as **one simple command**.

```bash
touch a.txt b.txt ls
```

→ Interpreted as `touch` with args `a.txt b.txt ls` (not two commands).
  
- Use a **control operator** like `;` to separate them:
 
```bash
touch a.txt b.txt ; ls
```
  
→ Now `touch` and `ls` are **two simple commands**.

### Compound Commands

- **Definition:** Commands that start **and end** with **reserved words** (bash keywords).
- **Reserved words examples:**
   - `if … fi`
   - `while … done`
   - `for … do … done`
  - `case … esac`

- **Check reserved word:**

```bash
   type if      # reserved word
   type elif    # reserved word
   type ls      # normal command
```

- **Features:**
   - Can span multiple lines.
   - Contain both simple and compound commands inside.
   - Used for **programming constructs**: conditions, loops, iterations.

### Example:

```bash
if [ -f /etc/passwd ]; then
    tail -n 3 /etc/passwd
fi
```

- `if` starts compound command.
- `fi` ends it.
- Inside: a **test** + a simple command (`tail`).

### Recap

1. After tokenization → shell does **command identification**.
2. **Simple command** = list of words, first word = command name, rest = arguments, terminated by newline/control operator.
3. **Compound command** = starts & ends with reserved words, represents programming constructs (if, while, for, etc.).
4. Next stage after identification = **Shell Expansions**.


## Shell Expansions
---

- Expansion happens **after tokenization** and **command identification**.
- **Definition:** Expansion is the procedure of replacing a reference with its actual value.
- Example:

```bash
echo $HOME
```

 - `$HOME` → expanded into `/home/ahmad` (actual value).

### Types of Expansions (in order)

1. **Brace Expansion `{ }`**
   - Generates arbitrary strings.
   - Example:

```bash
echo file{1..3}
# file1 file2 file3
```
 
2. **Tilde Expansion `~`**
   - Expands to home directories.
   - Example:

```bash
echo ~
# /home/ahmad
```


3. **Parameter and Variable Expansion `$VAR`**
   - Expands variables, parameters, special vars.
   - Example:

```bash
echo $USER
```

4. **Command Substitution `$( )` or `` ` ` ``**
   - Runs a command and replaces it with the output.
   - Example:

```bash
echo "Today is $(date)"
```

5. **Arithmetic Expansion `$(( ))`**
   - Evaluates arithmetic expressions.
   - Example:
   
```bash
echo $((2 + 3))
# 5
```

6. **Process Substitution `<( ) , >( )`**
   - Treats command output/input like a file.
   - Example:

```bash
diff <(ls dir1) <(ls dir2)
```

7. **Word Splitting**
   - Splits results of expansion into multiple words (based on `$IFS`).
   - Example:

```bash
VAR="a b c"
echo $VAR   # a b c
```

8. **Filename Expansion (Globbing)**
   - Expands wildcard characters (`*`, `?`, `[ ]`).
   - Example:

```bash
echo *.txt
# lists all .txt files
```

### After Expansions

- **Quote removal** is performed.
- This removes quotes `"` `'` `` ` `` but keeps the expanded values.

### Recap

- Expansions = replace references with values.
- There are **8 types**, executed in a strict order.
- Final step after all expansions = **quote removal**.


## Quote Removal in Bash
---

- **Quote removal** is performed **after shell expansions**.
- Purpose: remove the quoting characters that were only used to control interpretation.

- All **unquoted occurrences** of:
   - Backslash (`\`)
   - Single quotes (`'`)
   - Double quotes (`"`)
- These are removed **if they did not result from an expansion**.

### Why are quotes/backslashes removed?

- Quotes/backslashes temporarily remove the **special meaning** of characters.
- Once the shell has interpreted them, they are no longer needed and are removed.

### Examples

1. Prevent variable expansion with backslash:

```bash
echo \$USER
```

Output:

 ```bash
$USER
```

 - The backslash was removed during quote removal.

2. Printing quotes literally:

```bash
 echo 'single quotes' "Linux in double quotes"
 ```

- Single quotes are removed.
- Double quotes remain if they were quoted.

3. Variable containing backslashes:

```bash
dir="C:\Windows\System"
echo $dir
```

  - Backslashes remain.
  - Reason: they came from **variable expansion**, not from quoting.

### Key Rule

- **Only unquoted backslashes, single quotes, and double quotes** are removed,
- and only if they are not generated by an expansion.



## Shell Redirections
---

### Command Processing Context

- After **quote removal**, the **last step** in command line processing is **redirections**.
- Redirections control where input comes from and where output goes.

### Standard Data Streams

Every shell command has **three default streams**, identified by numbers (file descriptors):

- **0 → stdin (Standard Input)**  
   Input to the program (keyboard by default).
- **1 → stdout (Standard Output)**  
- **2 → stderr (Standard Error)**  
   Error messages (screen by default).

![Standard data streams diagram showing stdin stdout and stderr](/1-Notes/Shell%20Scripting/assets/img-1.webp)

> These numbers (0, 1, 2) are **file descriptors** opened each time a command runs.

### Standard Input Redirection (`<`)

- Redirects input from a file instead of keyboard.
- Example:

```bash
tail < /etc/group
cat < /etc/passwd
```

- Many commands that accept a filename as an argument will read from **stdin** if no file is provided.

### Standard Output Redirection (`>`)

- Redirects command output to a file instead of screen.
- Example:

```bash
ls -l > ls.txt
```

- Behavior:
   - Creates file if it doesn’t exist.
   - **Overwrites** file if it already exists.
- Example overwrite:

```bash
ip addr > ls.txt
# overwrites ls.txt, removes previous ls -l output
```

### Append Redirection (`>>`)

- Appends output to the end of a file instead of overwriting it.
- Example:

```bash
ls -l >> output.txt
ip addr >> output.txt
```

- Behavior:
   - Creates file if it doesn’t exist.
   - Appends if file exists.

### Everything is a File in Linux

- Even terminals are represented as files.
- Check terminal device:

```bash
tty
# Output: /dev/pts/0
```

- Redirect output to another terminal:

```bash
ip addr > /dev/pts/0
```

- Result: Output appears in the **other terminal window** (like basic instant messaging).



## Shell Redirections (Part 2: stderr, combining, tee)
---

### File Descriptors Recap

- **stdin (0)** → standard input
- **stdout (1)** → standard output
- **stderr (2)** → standard error

By default:

- `>` = redirects **stdout** (fd 1).
- To redirect **stderr**, you must **explicitly specify `2>`**.

### Redirecting Standard Error

- Example command that generates error:

```bash
tail -n3 /etc/shadow
```

- (normal users cannot read it)

- Redirect stderr:

```bash
tail -n3 /etc/shadow 2> error.txt
```

 - No spaces between `2` and `>`.
 - Creates file if missing, overwrites if exists.

- Append stderr:

```bash
tail -n3 /etc/shadow 2>> error.txt
```

### Redirecting stdout and stderr Separately

- Redirect outputs to different files:

```bash
tail -n2 /etc/passwd /etc/shadow > output.txt 2> errors.txt
```

- `output.txt` → normal command output.
- `errors.txt` → error messages.

### Redirecting stdout and stderr to Same File

- Redirect stdout to file, stderr to stdout:

```bash
tail -n2 /etc/passwd /etc/shadow > output_errors.txt 2>&1
```

- Explanation:
  - `2>&1` → redirect stderr (2) to wherever stdout (1) is going.
  - Ampersand (`&`) indicates **stream reference**, not a filename.
  - Without `&`, it would create a file literally called `1`.

### Redirections with Pipes

- You can still combine with pipes (`|`).
- Example: extract MAC address:

```bash
ifconfig | grep ether | cut -d" " -f10 > mac.txt
```

- `cut -d " " -f10` → splits by space, picks 10th field (MAC address).

### The `tee` Command

- Problem: normal redirection saves to file but hides from terminal.
- `tee` solves this by **splitting output** (like a plumbing T-junction).

Examples:

1. Save and display:

```bash
ifconfig | grep ether | tee mac.txt
```

 - Displays on screen + saves to `mac.txt`.

2. Append mode:

```bash
who | tee -a mac.txt
```

3. Save to multiple files:

```bash
uname -r | tee -a mac.txt kernel.txt
```
  
### Key Points

- `2>` → redirect stderr.
- `>` defaults to stdout (1).
- `2>&1` → merge stderr into stdout.
- Redirections work with pipes.
- `tee` → write to file(s) and screen simultaneously.


## Bash Redirection & Pipe Cheat Sheet
---

| Symbol / Command  | Meaning                       | Example                                    | Notes                                          |
| ----------------- | ----------------------------- | ------------------------------------------ | ---------------------------------------------- |
| `<`               | Redirect stdin (input)        | `sort < file.txt`                          | Reads input from file instead of keyboard      |
| `>`               | Redirect stdout (overwrite)   | `echo hello > out.txt`                     | Creates or overwrites file                     |
| `>>`              | Redirect stdout (append)      | `echo hi >> out.txt`                       | Adds to file, keeps existing content           |
| `2>`              | Redirect stderr (overwrite)   | `ls /root 2> errors.txt`                   | Errors go to file                              |
| `2>>`             | Redirect stderr (append)      | `ls /root 2>> errors.txt`                  | Errors appended                                |
| `&>`              | Redirect both stdout + stderr | `cmd &> all.txt`                           | Equivalent to `> all.txt 2>&1` (bash-specific) |
| `2>&1`            | Redirect stderr to stdout     | `ls /root > all.txt 2>&1`                  | Merge both into same file                      |
| `                 | ` (pipe)                      | Send stdout of one cmd as stdin to another | `ls                                            |
| `cmd 2>&1         | cmd2`                         | Pipe stdout+stderr to next command         | `ls /root 2>&1                                 |
| `tee`             | Split output → screen + file  | `ls                                        | tee list.txt`                                  |
| `tee -a`          | Append mode for tee           | `ls                                        | tee -a list.txt`                               |
| `tee file1 file2` | Write to multiple files       | `ls                                        | tee f1 f2`                                     |


### ⚡ Quick Notes:

- **File Descriptors (FDs):**
   - `0` → stdin
   - `1` → stdout
   - `2` → stderr
- No spaces allowed between **FD number and operator**:  
   ✅ `2> file.txt`  
   ❌ `2 > file.txt`
- Without number: `>` = `1>` (stdout).


## Detailed Example, Step-By-Step, How Bash Processes This Command
---

Example command (from the video), written exactly:

```bash
ls $HOME > $(date +%H_%M).txt
```


### 1) Tokenization

- Shell looks for **unquoted meta characters** (space, tab, newline, and the special symbols), to split the input into tokens.
- In this command there are two unquoted meta characters, space and `>`.
- Important: the space inside `$(date +%H_%M)` does **not** count, because it is inside a command substitution, so it is treated as part of a single token.
- Tokens produced:
    
    1. `ls`
    2. `$HOME`
    3. `>`
    4. `$(date +%H_%M).txt`
- Classification, after tokenization:
    - **Words** (no unquoted meta chars): `ls`, `$HOME`, `$(date +%H_%M).txt`
    - **Operator** (contains an unquoted meta char): `>`
- Note: `$` is not a meta character, so `$HOME` remains a single word token.

### 2) Command identification

- The shell identifies the command type, simple or compound.
- This command is a **simple command**, because it does not start with a reserved word (if, while, for, etc).
- A simple command is terminated by a control operator or the invisible newline at the end of the line. Here the newline (end of line) terminates the command.
- `>` is a redirection operator, not a control operator, so it stays part of the same simple command.

### 3) Expansions (performed in strict order)

Bash runs expansions in this order, only some apply here:

1. Brace expansion
2. Tilde expansion
3. Parameter and variable expansion
4. Command substitution
5. Arithmetic expansion
6. Process substitution
7. Word splitting
8. Filename expansion (globbing)

- In our example, the relevant expansions are:
   - **Parameter expansion**: `$HOME` → `/home/student` (example value)
   - **Command substitution**: `$(date +%H_%M)` → `11_16` (example output, hour_minute)
- After those expansions, the command becomes:

```bash
ls /home/student > 11_16.txt
```

### 4) Word splitting and filename expansion, then quote removal

- **Word splitting**: bash will split expansion results into words based on `$IFS` (by default space, tab, newline), but only for expansions not inside double quotes.
   - In this example, neither expansion produced spaces, so **no splitting** occurs.
- **Filename expansion (globbing)**: only happens if there are unquoted wildcard characters (`* ? [ ]`) in the words, none here.
- **Quote removal**: any remaining unquoted backslashes, single quotes, double quotes that were not produced by expansions are removed. There are none here, so nothing is removed.


### 5) Redirections

- Shell inspects redirection operators and sets up file descriptors before executing the command.
- Here the single greater-than `>` is present, so:
   - stdout (fd 1) is redirected to the file `11_16.txt`.
   - If `11_16.txt` does not exist, bash creates it.
   - If it exists, bash **overwrites** it (use `>>` to append instead).
- After setting up the redirection, the command is ready to run.

### Execution

- Bash executes `ls` with argument `/home/student`.
- The `ls` output goes to the file `11_16.txt` (because stdout was redirected).
- Bash waits for the command to finish, then collects its exit status.

### Quick checklist, with the most important rules illustrated by this example

- Meta characters only act when **unquoted** (spaces inside `$(...)` are ignored for tokenization).
- `$` is not a meta character, it is part of words until parameter expansion runs.
- Command substitution is treated as a single token during tokenization.
- Expansions occur in a fixed order, parameter and command substitution happen before word splitting.
- Word splitting uses `$IFS`, default is space, tab, newline. If an expansion yields spaces, it can produce extra words.
- `>` is a redirection operator, not a control operator, so it does not split the command into multiple commands.
- Redirections are applied after expansions and quote removal, before execution. `>` creates or overwrites, `>>` appends.
- Invisible newline at end of input acts as the terminating control operator for a simple command.

