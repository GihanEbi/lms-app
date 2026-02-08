CREATE TABLE "group_rules" (
	"group_id" integer NOT NULL,
	"rule_id" integer NOT NULL,
	CONSTRAINT "group_rules_group_id_rule_id_pk" PRIMARY KEY("group_id","rule_id")
);
--> statement-breakpoint
CREATE TABLE "rules" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"user_created" integer,
	"user_modified" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "user_groups" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"user_created" integer,
	"user_modified" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "user_groups_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "group_rules" ADD CONSTRAINT "group_rules_group_id_user_groups_id_fk" FOREIGN KEY ("group_id") REFERENCES "public"."user_groups"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "group_rules" ADD CONSTRAINT "group_rules_rule_id_rules_id_fk" FOREIGN KEY ("rule_id") REFERENCES "public"."rules"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rules" ADD CONSTRAINT "rules_user_created_users_id_fk" FOREIGN KEY ("user_created") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rules" ADD CONSTRAINT "rules_user_modified_users_id_fk" FOREIGN KEY ("user_modified") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_user_created_users_id_fk" FOREIGN KEY ("user_created") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_user_modified_users_id_fk" FOREIGN KEY ("user_modified") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;