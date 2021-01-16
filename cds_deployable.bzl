load("//tools:def.bzl", "node_package_deployable")

def cds_deployable(name):
    deploy_label = "//eng/shared/design-system/%s:package" % name

    # Publish to development
    node_package_deployable(
        name = "publish_%s_dev" % name,
        pkg = deploy_label,
        target = "development",
    )

    # Publish to corporate
    node_package_deployable(
        name = "publish_%s" % name,
        pkg = deploy_label,
        target = "corporate",
        continuous_deployment = True,
    )
