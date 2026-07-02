const express = require("express");
const prisma = require("../prisma");
const { authRequired } = require("../middleware/auth");

function makeCrudRouter(model) {
  const router = express.Router();
  const db = prisma[model];

  router.get("/", async (req, res) => {
    const where = req.query.published === "true" ? { published: true } : {};
    res.json(await db.findMany({ where, orderBy: { createdAt: "desc" } }));
  });

  router.get("/:slug", async (req, res) => {
    const item = await db.findUnique({ where: { slug: req.params.slug } });
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  });

  router.post("/", authRequired, async (req, res) => {
    try {
      res.json(await db.create({ data: req.body }));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  router.put("/:id", authRequired, async (req, res) => {
    try {
      res.json(await db.update({ where: { id: Number(req.params.id) }, data: req.body }));
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  router.delete("/:id", authRequired, async (req, res) => {
    try {
      await db.delete({ where: { id: Number(req.params.id) } });
      res.json({ success: true });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  });

  return router;
}

module.exports = makeCrudRouter;
