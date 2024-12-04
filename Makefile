# Access routes in a local replica
# canisterId.localhost:4943/whatever_route
# http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943/hi

# icx-asset --replica https://icp0.io --pem ~/.config/dfx/identity/raygen/identity.pem upload 4623w-oqaaa-aaaak-qtrjq-cai /index.html=src/assets/index.html

# npx repomix --ignore ".mops/,.dfx/,.vscode,node_module/,.gitignore,src/frontend/public/bundle.js,src/frontend/public/edge.html"   

# dfx canister call --ic 4623w-oqaaa-aaaak-qtrjq-cai invalidate_cache

# dfx canister --ic deposit-cycles 1000000000000 4623w-oqaaa-aaaak-qtrjq-cai



upasic: # upload assets on ic & clear cache
	npx webpack
	npm run upload
	dfx canister call --network ic frontback_motoko invalidate_cache

upaslocal: # upload assets locally & clear cache
	npx webpack
	npm run upload
	dfx canister call frontback_motoko invalidate_cache