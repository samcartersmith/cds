def _gen_babel_preset_impl(ctx):
    """
    Rule for generating babel preset with correct custom plugin path from bazel output.
    """
    out = ctx.actions.declare_file((ctx.attr.out if ctx.attr.out else ctx.label.name) + ".js")
    ctx.actions.expand_template(
        output = out,
        template = ctx.file._template,
        substitutions = {
            "{bazel_out}": ctx.bin_dir.path,
        },
    )
    return [DefaultInfo(files = depset([out]))]

gen_babel_preset = rule(
    implementation = _gen_babel_preset_impl,
    attrs = {
        "_template": attr.label(
            allow_single_file = [".js.tpl"],
            # mandatory = True,
            doc = "The babel preset template to generate for.",
            default = "scripts/build/preset.js.tpl",
        ),
        "out": attr.string(
            doc = "The name of the output file.",
        ),
    },
)
