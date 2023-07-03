const mandatory_checks = {
    "trivy": [ "trivy-scan / trivy-scan" ],
    "trufflehog": [ "trufflehog-scan / trufflehog-scan" ],
    "danger": [ "danger / danger" ]
}

const optional_checks = {
    "helm": [ "helm-ci-checks / helm-ci-checks" ],
    "yaml": [ "yaml-lint / yaml-lint" ],
    "conftest": [ "conftest / conftest" ]
}

module.exports = {
    mandatory_checks: mandatory_checks,
    optional_checks: optional_checks
};
