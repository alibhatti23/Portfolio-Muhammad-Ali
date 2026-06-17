---
title: Shell Expansion in Shell Scripting
draft: false
date: 2025-09-30
description: Learn About Shell Expansion in Shell Scripting
categories:
  - tech
tags:
  - tech
  - shell
  - scripting
Author: Ahmad Hassan
keywords:
  - shell expansion bash
  - brace expansion
  - tilde expansion
  - parameter variable expansion
  - command substitution bash
  - arithmetic expansion
  - process substitution
  - word splitting IFS
  - filename expansion globbing
  - bash scripting tutorial
---

# Shell Expansion

In Section we are going to learn about Shell Expansion, How bash perform the Shell Expansion

## What is Expansion?
---

- When you type a command and press **Enter**, the shell performs several steps before execution.
- After **tokenization**, **Command Identification** (splitting the command into words/tokens) and parsing, the shell performs **expansions**.
- **Expansion** = the process of replacing symbols, variables, or patterns with their actual values.

Example:

```bash
echo $HOME
```

Here `$HOME` is **expanded** into your actual home directory path (like `/home/ahmad`).


### Order of Shell Expansions

Bash applies expansions in a **specific order**:

1. **Brace Expansion** `{ }`
2. **Tilde Expansion** `~`
3. **Parameter and Variable Expansion** `$VAR`
4. **Command Substitution** `` `cmd` `` or `$(cmd)`
5. **Arithmetic Expansion** `$(( expression ))`
6. **Process Substitution** `<(cmd)` or `>(cmd)`
7. **Word Splitting**
8. **Filename Expansion (Globbing)** `* ? []`

### Quote Removal

- After expansions, **quote removal** is performed.
- Meaning: surrounding quotes (`"`, `'`) are stripped, but they influence whether expansions like word splitting or globbing happen.


## Brace Expansion in Shell (String List)
---


### Brace Expansion

- **Brace expansion** is a feature in Bash that allows you to generate arbitrary strings.
- It is **not variable expansion** or filename expansion, but rather a way to produce multiple strings at once.
- Example:

```bash
echo {old,new,current,backup}
```

Output:

```bash
old new current backup
```


### Types of Brace Expansion

There are **two types**:
1. **String lists** → comma-separated items inside `{}`
2. **Range/sequence lists** → numeric or character ranges (covered later)

### General Syntax (String List Form)

```bash
[prefix]{item1,item2,item3,...}[suffix]
```

  - **Prefix** → optional string before braces.
  - **Suffix** → optional string after braces.
  - **Items** → comma-separated list inside braces.

**Example:**

```bash
echo 01-{old,new,current,backup}.txt
```

**Output:**

```bash
01-old.txt 01-new.txt 01-current.txt 01-backup.txt
```


### Using Brace Expansion with Commands

Brace expansions are not limited to `echo`. They can be used with any command:

**Create files**:

```bash
touch {old,new,current,backup}.txt
```

**Remove files**:

```bash
rm {old,new,current,backup}.txt
```


### Rules and Restrictions

- **No spaces allowed around commas**:

```bash
echo {a, b}   # Wrong → prints {a, b}
echo {a,b}    # Correct → prints a b
```

- **Must have unquoted `{` `}` and at least one unquoted comma**.
- Incorrectly formed expansions are **left unchanged**:

```bash
echo "{a,b}"   # Prints {a,b}, no expansion
```


### Nested Brace Expansions

Brace expansions can be **nested inside each other**:

```bash
echo {old,new}-{10,20,30}
```

**Output:**

```bash
old-10 old-20 old-30 new-10 new-20 new-30
```

- Expansion is performed **from left to right**.


## Brace Expansion in Shell (Ranges / Sequences)
---

### What is Sequence Brace Expansion?

- It generates a **contiguous range of numbers or letters**.
- General form:

```bash
{start..end[..step]}
```

- Works for **integers** and **characters (letters)**.

Basic Examples

- **Numbers**:

```bash
echo {1..5}
```

**Output:**

```bash
1 2 3 4 5
```

**Letters**:

```bash
echo {A..L}
```

**Output:**

```bash
A B C D E F G H I J K L
```

```bash
echo {A..Z}
```


**Output:**

```bash
A B C ... X Y Z
```


### Increment (Step Value)

- You can specify a step size.

```bash
echo {1..20..2}
```

**Output:**

```bash
1 3 5 7 9 11 13 15 17 19
```

- By default, step = **1**.

### Zero Padding

- If a number starts with **0**, Bash pads all numbers to the same width.

```bash
echo {01..10}
```

**Output:**

```bash
01 02 03 04 05 06 07 08 09 10
```

Also

```bash
echo {005..010}
```

**Output:**

```bash
005 006 007 008 009 010
```

### Reverse Sequences


You can reverse the order.

```bash
echo {10..1}
```

**Output:**

```bash
10 9 8 7 6 5 4 3 2 1
```

Also

```bash
echo {Z..A}
```

**Output:**

```bash
Z Y X W V ... C B A
```

### Restrictions

**Both values must be the same type**:

- ✅ Numbers with numbers
- ✅ Letters with letters
- ❌ Cannot mix letters and numbers:

```bash
echo {1..A}   # Invalid, stays unchanged
```


### Expansion Order (Important)

- **Brace expansion happens before variable expansion**.
- This means you **cannot** use variables inside brace ranges.

```bash
A=1
echo {$A..50}   # ❌ Does NOT work
```

The shell tries to expand braces **before** replacing `$A`.


## Tilde Expansion in Shell

- After **brace expansion**, the shell performs **tilde expansion**.
- The `~` symbol is expanded to represent **home directories** and certain working directories.

### Common Expansions

- **Current user’s home directory**

```bash
echo ~
cd ~
```

Expands to `$HOME` (example: `/home/ahmad`).

- **Specific user’s home directory**

```bash
echo ~root
```

Expands to `/root`.

- **Current working directory**

```bash
echo ~+
```

Expands to `$PWD`.


- **Previous working directory**

```bash
echo ~-
```

- Expands to `$OLDPWD`.  
   If `$OLDPWD` is not set, `~-` does not expand.
- **Directory stack entries** (advanced, when using `pushd` / `popd`)
   - `~N` → Nth directory from the directory stack.
   - `~-N` → Nth entry counting from the right.

## Parameter and Variable Expansion
---

- Use `$` before a variable name:

```bash
os=linux
echo $os
echo ${os}
```

Both output:

```bash
linux
```

**Why braces `{}`?**

- To protect the variable name when followed by characters.

```bash
echo $osmint      # tries to expand $osmint (doesn’t exist)  
echo ${os}mint    # expands $os + "mint" → linuxmint  
```

### Case Modification Operators

- **Uppercase all letters**:

```bash
echo ${os^^}
```

→ `LINUX`

- **Lowercase all letters**:

```bash
echo ${os,,}
```

→ `linux`

**Note:** (Single `^` or `,` affects only the **first character**.)

### Default Value Substitution

**a) Use default if variable is unset/null:**

```bash
ping -c 3 ${ip:-1.1.1.1}
```

- If `$ip` exists → use its value.
- If `$ip` doesn’t exist → use `1.1.1.1`.

**b) Assign default if variable is unset/null:**

```bash
ping -c 3 ${ip:=8.8.4.4}
```

- If `$ip` is not set → assign `8.8.4.4` to it.
- Now `$ip` has this value permanently in the script.


Perfect, that transcript is walking you through **Command Substitution** in shell scripting.  
Here are the **detailed notes** you can keep:

---

## Command Substitution in Shell
---

- **Command substitution** allows you to **run a command** and **use its output** as a value inside your script.
- Think of it as replacing the command with its result.
- Extremely useful for dynamic values like dates, usernames, process lists, etc.

### Syntax

There are **two ways** (both valid):

#### a) Backticks `` `command` `` (older form)

```bash
now=`date`
echo "$now"
```

#### b) Dollar-parentheses `$(command)` (modern, preferred)

```bash
now=$(date)
echo "$now"
```

✅ Both execute `date` and store its output in `now`.  
✅ The second form is **clearer, supports nesting**, and is more common in modern scripts.

### Best Practices with Quotes

- Always wrap the substitution in **double quotes**.

```bash
now="$(date)"
```
   
- Why? To prevent **word splitting** and **filename expansion** on the output.  
- Without quotes, spaces in the output can break your script.

### Examples

#### Store date in variable

```bash
now=$(date)
echo "The time is: $now"
```

#### Count logged-in users

```bash
users=$(who)
echo "Users logged in: $users"
```

#### Using pipelines in substitution

```bash
bash_processes=$(ps -ef | grep bash)
echo "$bash_processes"
```

#### Archive with timestamp in filename

```bash
tar -czf etc-$(date +%F-%H%M).tar.gz /etc
```

- `%F` → `YYYY-MM-DD`
- `%H` → Hour (00-23)
- `%M` → Minute

Result: `etc-2025-09-11-1021.tar.gz`

### Overwriting vs unique files

- Without substitution → archive overwrites on rerun.
- With substitution → new file each run (different name due to timestamp).

### Why prefer `$(command)` over backticks?

- Easier to read.
- Can nest commands:

```bash
echo "Today is $(date +%A), user count: $(who | wc -l)"
```


- Backticks `` `...` `` require escaping and become messy in nested cases.

### Summary

- Command substitution = replace command with its **output**.
- Syntax: `` `command` `` or `$(command)` (preferred).
- Always quote results `"$(command)"`.
- Useful for logging, filenames, conditional logic, and dynamic input.


## Arithmetic Expansion in Shell Scripting
---

```bash
$(( expression ))
```

- Everything inside `(( ))` is evaluated as an arithmetic expression.
- The result replaces the expression in the command line.

Example:

```bash
x=$((7 * 9))
echo $x   # 63
```


### Key Points

1. **Tokens inside the expression** undergo:
   - Parameter expansion (variables are expanded)
   - Command substitution (commands inside will execute first)
   - Quote removal
2. **Operators & precedence**  
   Same as in C or other languages:
   - `+ - * / %` (addition, subtraction, multiplication, division, modulus)
   - `**` (power/exponentiation)
   - Comparison (`<`, `>`, `<=`, `>=`, `==`, `!=`)
   - Logical (`&&`, `||`, `!`)
   - Assignment (`=`, `+=`, `-=`, etc.)
3. **Examples**

```bash
echo $((2 + 3 * 4))   # 14
echo $((2 ** 8))      # 256
```


### Using `let`

The `let` built-in command also evaluates arithmetic:

```bash
let y=2**8
echo $y   # 256
```

### Limitations

1. **Only integers are supported**
   - No floating-point numbers in Bash arithmetic.
   - Example:

```bash
echo $((5 / 2))   # 2, not 2.5
```

2. **Overflow possible**
   - If a number exceeds the system’s max integer size, it wraps around or becomes zero.
   - Example:

```bash
echo $((2 ** 128))   # Overflow → result invalid
```


### Decimal (Floating-Point) Calculations with `bc`

For real numbers, use `bc` (Basic Calculator).

#### Pipe to `bc`

```bash
echo "3 * 7" | bc   # 21
```

#### Division with scale

```bash
echo "scale=2; 11 / 4" | bc   # 2.75
```

- `scale=n` → number of decimal places to show.

#### Using **Here String**

```bash
bc <<< "scale=3; 23 / 7"
# 3.285
```

#### Interactive mode

```bash
bc
# Then type expressions manually
```


**Summary**

- Use `$(( ))` for integer math in scripts.
- Use `let` as an alternative.
- For floating-point or high-precision math, use `bc`.


## Process Substitution in Shell
---

- Process substitution allows you to **treat the output of a command as if it were a file**.
- In Linux, "everything is a file", so the shell can represent command output internally as a temporary file (often in `/dev/fd/`).

Example:

```bash
cat <(ls)
```

- `<(ls)` runs `ls`, creates a file descriptor with the output, and `cat` reads it like a file.


### Syntax

- Input form:

```bash
<(command)
 ```
   
**Note**: The output of `command` becomes a file-like input.

- Output form:

```bash
>(command)
```

- The output of your program is sent as input to `command`.

**Note**: **No space** between `<` or `>` and the parentheses.

```bash
<(ls)   # ✅ valid
< (ls)  # ❌ error
```

#### Basic Example

```bash
echo <(ls)
```

- Prints something like: `/dev/fd/63` (a file descriptor).

```bash
cat <(ls)
```

- Prints the actual content of `ls` (directory listing).

### Practical Example: Comparing Directories

You want to compare filenames in two directories:

```bash
mkdir dir1 dir2
touch dir1/a dir1/b dir2/a dir2/c

# Compare contents of dir1 and dir2
diff <(ls dir1) <(ls dir2)
```

Output:

```
1d0
< b
1a2
> c
```

- Shows that `b` is only in dir1 and `c` is only in dir2.

### 5. Why Use Process Substitution?

- Lets you use commands that normally expect **files** as input, but instead give them **command output**.
- Avoids creating temporary files with `>` redirection.
- Useful in **loops, arrays, and comparisons**.

#### Real-World Use Cases

- Compare process lists:

```bash
diff <(ps -ef | sort) <(ps -ef | sort -r)
```

- Feed multiple commands into `paste`:

```bash
paste <(ls dir1) <(ls dir2)
```

- Sorting and comparing logs:

```bash
diff <(sort file1.log) <(sort file2.log)
```

### Notes

- **Available in Bash, Zsh, Ksh**, but not in POSIX `sh`.
- Internally uses **named pipes (FIFOs) or `/dev/fd`**.
- Very powerful with tools like `diff`, `comm`, `paste`.

**Summary**

- Process substitution = treat command output like a file.
- Syntax: `<(command)` or `>(command)` (no space).
- Useful for comparisons, loops, avoiding temp files.
- Works with commands that require **filenames** instead of STDIN.


## Word Splitting, explained
---

Word splitting is the shell step that breaks the result of _unquoted_ expansions into separate words, using the `IFS` variable as delimiters. It happens after brace expansion, tilde, parameter expansion, command substitution, arithmetic expansion, and process substitution, but before filename expansion (globbing) and quote removal.

### `IFS` (Internal Field Separator)

- Default value, contains space, tab, newline (these are invisible characters).
- `IFS` defines the delimiters used for splitting.
- You can view `IFS` in a readable way, for example:

```bash
# show escapes for whitespace characters
printf '%s\n' "${IFS@Q}"
# or
echo "$IFS" | sed -n 'l'
```

### Basic behavior, examples

#### Unquoted expansion is split, quoted expansion is not

```bash
dirs="d1 d2 d3"

mkdir $dirs      # unquoted, word splitting creates 3 dirs: d1, d2, d3
mkdir "$dirs"    # quoted, creates a single dir named "d1 d2 d3"
```

#### Change IFS to split on other characters

```bash
oldIFS=$IFS
IFS=':'
dirs="d1:d2:d3"
mkdir $dirs      # creates d1, d2, d3 because IFS is ':'
IFS=$oldIFS      # restore original IFS
```

Tip, temporary change in a subshell:

```bash
( IFS=':'; mkdir $dirs )   # IFS change scoped to subshell
```


### Special behavior, important gotchas

- When `IFS` contains whitespace (default), consecutive whitespace is treated as a single delimiter, and leading/trailing whitespace is ignored. Example:

```bash
s="  a   b  c  "
set -- $s           # with default IFS
printf '[%s]\n' "$@" # prints [a] [b] [c]
```

- When `IFS` contains non-whitespace characters (for example `:`), adjacent delimiters create empty fields. Example:

```bash
IFS=':'
s="a::b"
set -- $s
printf '[%s]\n' "$@" # prints [a] [] [b], note the empty element
```

- Word splitting is applied to the results of unquoted expansions only. If you want to avoid splitting, quote the expansion: `"$var"`.
- Unquoted expansions are also subject to filename expansion (globbing) after splitting. Example risk:

```bash
names="*.txt"
rm $names    # could expand and delete files
rm "$names"  # removes a file literally named "*.txt", or fails if none
```

### Common, safe patterns

#### 1) Forward script arguments safely

```bash
# preserve argument boundaries, even with spaces
some_command "$@"
```

#### 2) Split into an array safely

```bash
IFS=':' read -ra parts <<< "$PATH"
# now ${parts[0]}, ${parts[1]}, ... are PATH elements
```

Use `-r` to prevent backslash escape interpretation, `-a` to populate an array.

#### 3) Temporarily change IFS without side effects

```bash
oldIFS=$IFS
IFS=','
# do work that requires comma splitting
IFS=$oldIFS
```

or use a subshell, `( IFS=','; ... )`.


### Summary, short rules

- Word splitting happens only on _unquoted_ expansion results.
- Default `IFS` = space, tab, newline. Change it if you need other delimiters.
- Prefer `"$var"` to avoid accidental splitting and globbing, unless you intentionally want splitting.
- Use `"$@"` to forward arguments safely.
- Use `read -ra` or array read patterns to split into arrays safely.
- Be mindful of whitespace vs non-whitespace IFS differences, they behave differently with adjacent delimiters.


## Filename Expansion (Globbing) in Shell
---

### What is Globbing?

- **Globbing** is the process where the shell expands special characters into matching filenames or paths.
- It happens **after word splitting** in the expansion order.
- Works in any command (`ls`, `rm`, `cp`, etc).
- If the pattern does not match any file, behavior depends on the shell:
   - In **bash** (default): the pattern is kept literally.
   - With `shopt -s nullglob`, unmatched patterns expand to nothing.

### Special Globbing Characters

#### Asterisk (`*`)

- Matches **zero or more characters**.
- Example:

```bash
ls f*
```

→ matches `f`, `fa.txt`, `foo.txt`, etc.

- Note: Hidden files (starting with `.`) are not matched unless explicitly included:

```bash
ls .*
```

#### Question Mark (`?`)

- Matches **exactly one character**.
- Example:

```bash
ls fa?.txt
```

→ matches `fa1.txt`, `fab.txt`, but not `fa10.txt`.
→ it work as placeholder so you can add multiple `?` to match pattern like 

```bash
ls fa??.txt

# Output 
fa10.txt # any two place file
```

It has two placeholder here that match anything in ? part
#### Square Brackets (`[]`)

- Matches **one character from a set or range**.
- Examples:

```bash
ls fa[123].txt    # matches fa1.txt, fa2.txt, fa3.txt
ls fa[a-c].txt    # matches faa.txt, fab.txt, fac.txt
```

- You can use ranges:
   - `[a-z]` → lowercase letters
   - `[A-Z]` → uppercase letters
   - `[0-9]` → digits

#### Negation inside `[]`

- `[^...]` or `[!... ]` matches any single character **not** in the set.

- Example:

```bash
ls fa[^0-9].txt
```

→ matches `faa.txt` but not `fa3.txt`.

### Important Notes

- **Quoting prevents globbing**:

```bash
ls "fa*.txt"
```

→ searches for a file literally named `fa*.txt` (no expansion).

- Always test dangerous commands (like `rm`) with `echo` first:

```bash
echo fa*.txt
rm fa*.txt
```


**Summary**:

- `*` → zero or more chars
- `?` → exactly one char
- `[abc]` → match a, b, or c
- `[a-z]` → range match
- `[^...]` or `[!... ]` → negation
