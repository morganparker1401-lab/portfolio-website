{
  description = "Morgan Parker Portfolio dev shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in
      {
        devShells.default = pkgs.mkShell {
          packages = with pkgs; [
            nodejs_24
            pnpm
          ];

          shellHook = ''
            echo "node $(node --version) / pnpm $(pnpm --version)"
            if [ ! -d node_modules ]; then
              echo "node_modules missing, running pnpm install..."
              pnpm install --frozen-lockfile
            fi
          '';
        };
      });
}
