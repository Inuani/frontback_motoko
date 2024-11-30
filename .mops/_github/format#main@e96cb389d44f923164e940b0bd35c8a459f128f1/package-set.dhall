let upstream = https://github.com/aviate-labs/package-set/releases/download/v0.1.3/package-set.dhall sha256:ca68dad1e4a68319d44c587f505176963615d533b8ac98bdb534f37d1d6a5b47
let vessel_package_set =
      https://github.com/dfinity/vessel-package-set/releases/download/mo-0.6.20-20220131/package-set.dhall


-- let Package = { name : Text, version : Text, repo : Text, dependencies : List Text }
-- let additions = [] : List Package

in  upstream # vessel_package_set