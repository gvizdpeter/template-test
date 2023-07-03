const { repos } = require("./repositories.js");
const { mandatory_checks, optional_checks } = require("./checks.js");

module.exports = async ({github, context, core}) => {
    const { GHE } = process.env
    console.log(typeof GHE);
    if (!GHE) {
        console.log("here");
    } else {
        console.log("there");
    }
}

function logStatus(wrappedFnc, repoName) {
    return async (...args) => {
        console.log(["Configuring", wrappedFnc.name, "for repository", repoName].join(" "));
        await wrappedFnc(...args);
        console.log(["Completed", wrappedFnc.name, "for repository", repoName].join(" "));
    }
}

async function branchProtection(github, context, repo, mandatory_checks, optional_checks) {
    for (branch of repo.branches) {
        let required_checks = [];
        for (mandatory_check in mandatory_checks) {
            if (!repo.ignore_mandatory_checks.includes(mandatory_check)) {
                for (check of mandatory_checks[mandatory_check]) {
                    required_checks.push({ "context": check });
                }
            }
        }
        for (optional_check of repo.optional_checks) {
            if (optional_check in optional_checks) {
                for (check of optional_checks[optional_check]) {
                    required_checks.push({ "context": check });
                }
            }
        }
        await github.rest.repos.updateBranchProtection({
            owner: context.repo.owner,
            repo: repo.name,
            branch: branch,
            required_pull_request_reviews: {
                dismissal_restrictions: {},
                dismiss_stale_reviews: true,
                require_code_owner_reviews: true,
                required_approving_review_count: 1,
                require_last_push_approval: true,
                bypass_pull_request_allowances: {}
            },
            required_status_checks: {
                strict: true,
                checks: required_checks
            },
            required_conversation_resolution: true,
            required_linear_history: true,
            enforce_admins: true,
            restrictions: null,
            allow_force_pushes: false,
            allow_deletions: false,
            block_creations: false,
            lock_branch: false,
            allow_fork_syncing: true
        });
    }
}

async function repositorySettings(github, context, repo) {
    await github.rest.repos.update({
        owner: context.repo.owner,
        repo: repo.name,
        allow_merge_commit: false,
        allow_squash_merge: true,
        squash_merge_commit_title: "PR_TITLE",
        squash_merge_commit_message: "COMMIT_MESSAGES",
        allow_rebase_merge: false,
        allow_update_branch: true,
        delete_branch_on_merge: true
    });
}

async function actionPermissions(github, context, repo) {
    await github.rest.actions.setGithubActionsPermissionsRepository({
        owner: context.repo.owner,
        repo: repo.name,
        enabled: true,
        allowed_actions: "selected"
    });
}

async function allowedActions(github, context, repo) {
    await github.rest.actions.setAllowedActionsRepository({
        owner: context.repo.owner,
        repo: repo.name,
        github_owned_allowed: true,
        verified_allowed: true
    });
}

async function actionsDefaultWorkflowPermissions(github, context, repo, is_ghe) {
    params = {
        owner: context.repo.owner,
        repo: repo.name,
        default_workflow_permissions: "write",
        can_approve_pull_request_reviews: true
    };
    if (is_ghe) {
        delete params.can_approve_pull_request_reviews;
    }
    await github.rest.actions.setGithubActionsDefaultWorkflowPermissionsRepository(params);
}

async function workflowAccessToRepository(github, context, repo) {
    if (repo.share_workflows) {
        access_level = "organization"
    } else {
        access_level = "none"
    }
    await github.rest.actions.setWorkflowAccessToRepository({
        owner: context.repo.owner,
        repo: repo.name,
        access_level: access_level
    });
}
