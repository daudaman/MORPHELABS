import React, { useEffect, useState } from "react";
import {
  Box, Button, Table, TableBody, TableCell, TableHead, TableRow,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Switch, FormControlLabel, Typography, IconButton, Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import api from "./api";

const FIELD_MAP = {
  posts: ["title", "slug", "content"],
  services: ["title", "slug", "description", "icon"],
  careers: ["title", "slug", "department", "location", "description"],
};

export default function ContentManager({ resource, label }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({});
  const fields = FIELD_MAP[resource];

  async function load() {
    const { data } = await api.get(`/${resource}`);
    setItems(data);
  }

  useEffect(() => { load(); }, [resource]);

  function openNew() {
    setForm({ published: false });
    setOpen(true);
  }

  function openEdit(item) {
    setForm(item);
    setOpen(true);
  }

  async function save() {
    if (form.id) await api.put(`/${resource}/${form.id}`, form);
    else await api.post(`/${resource}`, form);
    setOpen(false);
    load();
  }

  async function remove(id) {
    if (!confirm("Delete this item?")) return;
    await api.delete(`/${resource}/${id}`);
    load();
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5">{label}</Typography>
        <Button variant="contained" onClick={openNew}>New {label.slice(0, -1)}</Button>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Status</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <Chip label={item.published ? "Published" : "Draft"} color={item.published ? "success" : "default"} size="small" />
              </TableCell>
              <TableCell align="right">
                <IconButton onClick={() => openEdit(item)}><EditIcon fontSize="small" /></IconButton>
                <IconButton onClick={() => remove(item.id)}><DeleteIcon fontSize="small" /></IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{form.id ? "Edit" : "New"} {label.slice(0, -1)}</DialogTitle>
        <DialogContent>
          {fields.map((f) => (
            <TextField
              key={f}
              label={f}
              fullWidth
              margin="normal"
              multiline={f === "content" || f === "description"}
              rows={f === "content" ? 6 : 2}
              value={form[f] || ""}
              onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            />
          ))}
          <FormControlLabel
            control={<Switch checked={!!form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />}
            label="Published"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={save}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
