const repos = [
    {
        name: "dbap-github-repo-template",
        branches: [ "master" ],
        optional_checks: [],
        ignore_mandatory_checks: [],
        share_workflows: true
    },
    {
        name: "cassandra",
        branches: [ "master" ],
        optional_checks: [ "helm" ],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "dbap-github-actions",
        branches: [ "master" ],
        optional_checks: [ "yaml" ],
        ignore_mandatory_checks: [],
        share_workflows: true
    },
    {
        name: "dbap-grafana-objects",
        branches: [ "master" ],
        optional_checks: [ "helm", "conftest" ],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "dbap-jenkins-jobs",
        branches: [ "job-dsl" ],
        optional_checks: [],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "dbap-mongodb",
        branches: [ "master" ],
        optional_checks: [ "helm" ],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "dbap-postgres",
        branches: [ "master" ],
        optional_checks: [ "helm" ],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "dbap-utils",
        branches: [ "master" ],
        optional_checks: [],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "janusgraph",
        branches: [ "master" ],
        optional_checks: [ "helm" ],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "opensearch",
        branches: [ "master" ],
        optional_checks: [ "helm" ],
        ignore_mandatory_checks: [],
        share_workflows: false
    },
    {
        name: "presto",
        branches: [ "master" ],
        optional_checks: [],
        ignore_mandatory_checks: [],
        share_workflows: false
    }
];

module.exports = {
    repos: repos
};
