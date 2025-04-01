import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { registerSchema, loginSchema } from "@/schema/authSchema";
const users = [
  {
    id: 1,
    email: "test@example.com",
    password: bcrypt.hashSync("123456", 10),
    name: "John Doe",
  },
  {
    id: 2,
    email: "jane.doe@example.com",
    password: bcrypt.hashSync("abcdef", 10),
    name: "Jane Doe",
  },
  {
    id: 3,
    email: "sam.smith@example.com",
    password: bcrypt.hashSync("password123", 10),
    name: "Sam Smith",
  },
  {
    id: 4,
    email: "lisa.jones@example.com",
    password: bcrypt.hashSync("qwerty", 10),
    name: "Lisa Jones",
  },
  {
    id: 5,
    email: "mike.brown@example.com",
    password: bcrypt.hashSync("pass123", 10),
    name: "Mike Brown",
  },
  {
    id: 6,
    email: "emma.wilson@example.com",
    password: bcrypt.hashSync("securepass", 10),
    name: "Emma Wilson",
  },
  {
    id: 7,
    email: "oliver.taylor@example.com",
    password: bcrypt.hashSync("mypassword", 10),
    name: "Oliver Taylor",
  },
  {
    id: 8,
    email: "sophia.martin@example.com",
    password: bcrypt.hashSync("letmein", 10),
    name: "Sophia Martin",
  },
  {
    id: 9,
    email: "liam.thomas@example.com",
    password: bcrypt.hashSync("123abc", 10),
    name: "Liam Thomas",
  },
  {
    id: 10,
    email: "ava.jackson@example.com",
    password: bcrypt.hashSync("password1", 10),
    name: "Ava Jackson",
  },
];
export async function POST(req: Request) {
  let { email, password, name, action } = await req.json();

  if (action === "register") {
    const validation = registerSchema.safeParse({ email, password, name });
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors.map((e) => e.message) },
        { status: 400 }
      );
    }
    const user = users.find((u) => u.email === email);
    if (user) {
      return NextResponse.json(
        { success: false, message: "User already exists" },
        { status: 400 }
      );
    } else {
      registerSchema.parse({ email, password, name });

      const newPassword = bcrypt.hashSync(password, 10);
      password = newPassword;
      users.push({ id: users.length + 1, email, password, name });
      return NextResponse.json({
        success: true,
        message: "User registered successfully",
      });
    }
  }
  if (action === "login") {
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      return NextResponse.json(
        { success: false, message: validation.error.errors.map((e) => e.message) }, 
        { status: 400 }
      );
    }

    const user = users.find(
      (u) => u.email === email && bcrypt.compareSync(password, u.password)
    );
    if (user) {
      return NextResponse.json({ success: true, message: "Login successful" });
    } else {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
  }

  return NextResponse.json(
    { success: false, message: "Invalid action" },
    { status: 400 }
  );
}
