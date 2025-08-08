echo "## 2025-08-08\n- Test commit to trigger auto-changelog\n" >> CHANGELOG.md
git add .
git commit -m "Test: trigger auto-changelog workflow"
git push origin main
