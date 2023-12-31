const gulp = require("gulp");
const path = require("path");
const fs = require("fs");
const _merge = require("lodash/merge");
const fractal = require("@frctl/fractal").create();
const mandelbrot = require("@frctl/mandelbrot");

const nunjucks = require("@frctl/nunjucks")({
	paths: ["components", "docs"],
	filters: {
		merge: function (...objs) {
			let result = {};
			objs.forEach((obj) => {
				if (!obj || typeof obj !== "object") {
					return;
				}
				result = _merge(result, obj);
			});
			return result;
		},
		inlineStylesheet: function (filepath) {
			const fullFilepath = path.join(
				path.resolve(__dirname, "../dist"),
				filepath
			);
			const fileContents = fs.readFileSync(fullFilepath, "utf-8");
			return `<style>${fileContents}</style>`;
		},
		inlineScript: function (filepath) {
			const fullFilepath = path.join(
				path.resolve(__dirname, "../dist"),
				filepath
			);
			const fileContents = fs.readFileSync(fullFilepath, "utf-8");
			return `<script>${fileContents}</script>`;
		},
	},
});

fractal.set("project.title", `Kickstart your design system`);

fractal.components.engine(nunjucks);
fractal.components.set("ext", ".njk");
fractal.components.set("path", "./components");
fractal.components.set("default.preview", "@preview");
fractal.components.set("default.status", "prototype");
fractal.components.set("statuses", {
	prototype: {
		label: "Prototype",
		description: "Prototype code. Do not implement.",
		color: "#FF3333",
	},
	wip: {
		label: "Work in progress",
		description: "Unfinished and subject to change. Implement with caution.",
		color: "#FF9233",
	},
	readme: {
		label: "Needs documentation",
		description:
			"Code complete but missing documentation. Implement with caution.",
		color: "#176BC1",
	},
	ready: {
		label: "Ready",
		description: "Code and documentation complete. Ready to implement.",
		color: "#29CC29",
	},
});

fractal.docs.engine(nunjucks);
fractal.docs.set("path", "./docs");
fractal.docs.set("default.status", "draft");

fractal.web.set("static.path", "./dist");
fractal.web.set("builder.dest", "./export");
fractal.web.theme(
	mandelbrot({
		format: "yaml",
		nav: ["search", "docs", "components", "assets", "information"],
		panels: ["notes", "view", "html", "resources", "info"],
		styles: ["default", "/css/styleguide.css"],
	})
);

gulp.task("fractal:clean", () => {
	const del = require("del");
	return del(["./export"]);
});

gulp.task("fractal:watch", () => {
	const logger = fractal.cli.console;
	const server = fractal.web.server({
		sync: true,
		port: 9000,
	});
	server.on("error", (err) => {
		logger.error(err.message);
	});
	return server.start().then(() => {
		logger.success(`Fractal server is now running at ${server.url}.`);
	});
});

gulp.task("fractal", () => {
	const logger = fractal.cli.console;
	const builder = fractal.web.builder();
	builder.on("progress", (completed, total) => {
		logger.update(`Exported ${completed} of ${total} items.`, "info");
	});
	builder.on("error", (err) => {
		logger.error(err.message);
	});
	return builder.build().then(() => {
		logger.success("Fractal build completed.");
	});
});
