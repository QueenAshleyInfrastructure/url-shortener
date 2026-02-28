#!/usr/bin/env bash
# Push each lab/SBA to its QueenAshleyInfrastructure repo.
# Run from repo root: 2025-RTT-74 (or from mod-10 with BASE=.)
set -e
BASE="${1:-.}"
if [[ "$BASE" == "." ]]; then
  BASE="mod-10"
fi
# Use SSH for QueenAshleyInfrastructure (e.g. github.com-queen in ~/.ssh/config). Or set GITHUB_REMOTE to HTTPS.
GITHUB="${GITHUB_REMOTE:-git@github.com-queen:QueenAshleyInfrastructure}"
REPOS_DIR="_push_repos"
mkdir -p "$REPOS_DIR"
cd "$REPOS_DIR"

# 1. advanced-counter <- mod-10/LAB 1/advanced-counter
echo "=== 1/5 advanced-counter ==="
if [[ ! -d advanced-counter/.git ]]; then
  git clone "$GITHUB/advanced-counter.git" advanced-counter
fi
rsync -a --delete --exclude='.git' "../LAB 1/advanced-counter/" advanced-counter/
cd advanced-counter && git add -A && git status
if [[ -n $(git status -s) ]]; then git commit -m "Lab 1: Advanced counter with useEffect"; git push origin main || git push origin master; fi
cd ..

# 2. custom-hooks <- mod-10/LAB 2 (entire lab)
echo "=== 2/5 custom-hooks ==="
if [[ ! -d custom-hooks/.git ]]; then
  git clone "$GITHUB/custom-hooks.git" custom-hooks
fi
rsync -a --delete --exclude='.git' "../LAB 2/" custom-hooks/
cd custom-hooks && git add -A && git status
if [[ -n $(git status -s) ]]; then git commit -m "Lab 2: Custom hooks (usePagination, useDebounce)"; git push origin main || git push origin master; fi
cd ..

# 3. context-api <- mod-10/LAB 3
echo "=== 3/5 context-api ==="
if [[ ! -d context-api/.git ]]; then
  git clone "$GITHUB/context-api.git" context-api
fi
rsync -a --delete --exclude='.git' "../LAB 3/" context-api/
cd context-api && git add -A && git status
if [[ -n $(git status -s) ]]; then git commit -m "Lab 3: Todo app with Context API"; git push origin main || git push origin master; fi
cd ..

# 4. dynamic-routing <- mod-10/LAB 4
echo "=== 4/5 dynamic-routing ==="
if [[ ! -d dynamic-routing/.git ]]; then
  git clone "$GITHUB/dynamic-routing.git" dynamic-routing
fi
rsync -a --delete --exclude='.git' --exclude='node_modules' "../LAB 4/" dynamic-routing/
cd dynamic-routing && git add -A && git status
if [[ -n $(git status -s) ]]; then git commit -m "Lab 4: Blog app with dynamic routing and auth"; git push origin main || git push origin master; fi
cd ..

# 5. recipe-discovery <- mod-10/SBA
echo "=== 5/5 recipe-discovery ==="
if [[ ! -d recipe-discovery/.git ]]; then
  git clone "$GITHUB/recipe-discovery.git" recipe-discovery
fi
rsync -a --delete --exclude='.git' --exclude='node_modules' "../SBA/" recipe-discovery/
cd recipe-discovery && git add -A && git status
if [[ -n $(git status -s) ]]; then git commit -m "SBA: Recipe Discovery app (TheMealDB)"; git push origin main || git push origin master; fi
cd ..

echo "Done. Repos are in $(pwd). Remove with: rm -rf $REPOS_DIR"
