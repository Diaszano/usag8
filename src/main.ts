import App from "./App.svelte";
import "./app.css";
import { mount } from "svelte";

const target = document.getElementById("app");
if (!target) throw new Error("Usag8 app mount target not found");
mount(App, { target });
