# Access routes in a local replica
# canisterId.localhost:4943/whatever_route
# ex : http://bw4dl-smaaa-aaaaa-qaacq-cai.localhost:4943/hi

# upload assets on a canister using the crate icx-asset
# icx-asset --replica https://icp0.io --pem ~/.config/dfx/identity/raygen/identity.pem upload frontback_motoko /index.html=src/assets/index.html

# npx repomix --ignore ".mops/,.dfx/,.vscode,node_module/,.gitignore,src/frontend/public/bundle.js,src/frontend/public/edge.html"   

# dfx canister call --ic frontback_motoko invalidate_cache

# dfx canister --ic deposit-cycles 1000000000000 frontback_motoko



upasic: # upload assets on ic & clear cache
	npx webpack
	npm run upload
	dfx canister call --network ic frontback_motoko invalidate_cache

upaslocal: # upload assets locally & clear cache
	npx webpack
	npm run upload
	dfx canister call frontback_motoko invalidate_cache