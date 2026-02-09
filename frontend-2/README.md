# Features Implemented:

### 🎨 Professional Design System

Velox brand colors (Blue #0D355C, Orange #E82717, Blue-Gray #F0F8FF)
Custom button variants with gradients and shadows
Clean, responsive enterprise UI

### 🔐 Authentication System

Login form with sample credentials for all roles
Role-based access with 6 user types (ENGINEER, TEAMLEAD, COORDINATOR, ADMIN, MANAGEMENT, SYSTEM)
Professional welcome experience

### 📊 Role-Based Dashboard

Personalized welcome with user's name and role
Today's schedule overview with location, project details
Weekly statistics (schedules, site visits, office work, WFH)
Role-specific quick actions and team management tools

### 🗂️ Navigation Structure

Collapsible sidebar with role-based menu items
Professional header with notifications and user menu
Role badges and group information display

### 📱 Responsive Design

Mobile-optimized layout
Professional card-based design
Smooth animations and transitions

# **Engineer User – Schedule Management Workflow**,

---

## 👷‍♂️ **Engineer User – Schedule Management Workflow**

### 🔹 **Purpose**:

Engineers are responsible for **creating** and **requesting changes** to their **next-day schedules**. They can **initiate edits**, but these must be **approved and finalized by their Team Leader** (Group Leader).

---

### ✅ **Permissions Summary**:

| Action                 | Permission                             |
| ---------------------- | -------------------------------------- |
| Create own schedule    | ✅ Allowed                             |
| View own schedules     | ✅ Allowed                             |
| View team schedules    | ✅ Read-Only                           |
| Edit own schedule      | ⚠️ Edit request → Team Leader approval |
| Approve any schedule   | ❌ Not allowed                         |
| Edit others' schedules | ❌ Not allowed                         |

---

### 📝 **Workflow Steps**

#### **1. Create New Schedule**:

- Engineer logs in and navigates to **Manage Schedule**.
- Clicks **“Create Schedule”** → opens **modal form**.
- Fills out schedule details:

  - **Date** (default: tomorrow)
  - **Project No.**, **Work Location**, **Category**, **Work Description**

- Submits the form.
- A **confirmation modal** warns: “This schedule cannot be changed without approval.”
- Upon confirmation:

  - Schedule is stored in the system.
  - Status is set to `SUBMITTED`.

---

#### **2. Request to Edit a Schedule**:

- Engineer opens the schedule from their **schedule history**.
- Clicks **“Edit”** → makes the necessary changes.
- Upon resubmission:

  - The system creates an **Edit Request**.
  - Original schedule remains unchanged.
  - The schedule status is set to `PENDING EDIT APPROVAL`.

---

#### **3. Edit Request Tracking**:

- In the **Manage Schedule** table, the status column will reflect the current state:

  - `SUBMITTED` – Schedule successfully submitted.
  - `PENDING EDIT APPROVAL` – Waiting for Team Leader approval.
  - `APPROVED` – Approved and updated by Team Leader.
  - `REJECTED` – Edit request denied.

---

#### **4. Team Leader Review**:

- Team Leader receives a notification or sees pending edit requests in their dashboard.
- They review the edit request details.

  - **If Approved**: The schedule is updated in the system with the new data, and status changes to `APPROVED`.
  - **If Rejected**: The request is denied, and the original schedule remains; status changes to `REJECTED`.

---

### 📊 **Engineer Tabs/Views**:

| Tab Name            | Description                                                                          |
| ------------------- | ------------------------------------------------------------------------------------ |
| **Dashboard**       | Summary of their own schedules.                                                      |
| **Manage Schedule** | View schedule history, create new schedule, request edit, and see status of entries. |
| **Team Schedules**  | Read-only view of schedules of team members, grouped by team.                        |

---

### 🚫 **Restrictions**:

- **Cannot** directly modify previously submitted schedules.
- **Cannot** modify others' schedules.
- **Can** initiate an edit, but final change must be approved and applied by the **Team Leader**.
- **Can** view status of edit requests in the schedule table.

---

### 🔁 **Visual Status Flow (Simplified)**

```
[Engineer Submits Schedule] --> Status: SUBMITTED
       |
       V
[Engineer Requests Edit] --> Status: PENDING EDIT APPROVAL
       |
       V
[Team Leader Action]
    ├── Approve --> Status: APPROVED
    └── Reject  --> Status: REJECTED
```

---

# **Team Leader User – Schedule Management Workflow**

---

## 👨‍💼 **Team Leader (Admin) User – Schedule Management Workflow**

### 🔹 **Purpose**:

The **Team Leader** plays a dual role:

1. Acts as a **normal Engineer** for creating their own daily schedule.
2. Manages and **approves/edit schedules** for team members within their assigned **Group**.

They are responsible for **reviewing edit requests**, making updates when necessary, and ensuring schedule accuracy before forwarding it to higher-level roles like **Super Admin** or **Coordinator**.

---

### ✅ **Permissions Summary**:

| Action                                | Permission                            |
| ------------------------------------- | ------------------------------------- |
| Create own schedule                   | ✅ Allowed                            |
| View own schedules                    | ✅ Allowed                            |
| View team members' schedules          | ✅ Allowed                            |
| Edit own schedule (via approval flow) | ⚠️ Needs separate approval if changed |
| Edit team members' schedules          | ✅ Allowed (with restrictions)        |
| Approve engineer's edit request       | ✅ Allowed                            |
| Approve other team leader's schedule  | ❌ Not allowed                        |
| View schedules of other teams         | ❌ Not allowed                        |

---

### 📝 **Workflow Steps**

#### **1. Own Schedule Entry (As Engineer)**:

- Team Leader logs in.
- Navigates to **Manage Schedule**.
- Creates their **own schedule** just like an Engineer.
- Same validation and submission logic applies.
- Can request edit, which will follow a higher-level approval flow (e.g., **Management or Coordinator**).

---

#### **2. View & Manage Team Schedules**:

- Navigates to **“Team Schedule”** or **“Edit Requests”** tab.
- Sees list of schedules submitted by team members (based on `group_no`).
- Has the ability to:

  - View schedule details.
  - Track status (`SUBMITTED`, `PENDING EDIT APPROVAL`, etc.).

---

#### **3. Handle Edit Requests from Team Members**:

- When a team member submits an edit request:

  - The request appears in the Team Leader’s dashboard or schedule list with a `PENDING EDIT APPROVAL` status.

- Team Leader can:

  - Review the **before and after** data.
  - Choose to:

    - ✅ **Approve**: The modified data replaces the original schedule; status set to `APPROVED`.
    - ❌ **Reject**: Edit is discarded; status updated to `REJECTED`.

---

#### **4. Update Schedule on Behalf of Team Member**:

- In some cases (e.g., emergency or missed entries), the Team Leader can **directly update** the schedule of a team member **within their group**.
- Must log the reason (optional) for audit purposes.
- After update:

  - Status is marked as `UPDATED_BY_TEAM_LEAD` or similar for traceability.

---

#### **5. Daily Submission Check (Optional)**:

- Team Leader may have a dashboard card or filter to:

  - See how many team members have not submitted schedules yet.
  - Follow up or remind them if needed.

---

### 📊 **Team Leader Tabs/Views**:

| Tab Name            | Description                                                   |
| ------------------- | ------------------------------------------------------------- |
| **Dashboard**       | Summary of team schedules, pending requests, group analytics. |
| **Manage Schedule** | Submit own schedule and track status.                         |
| **Team Schedules**  | View, filter, and manage team members' schedules.             |
| **Edit Requests**   | Approve/reject pending edit requests from team.               |

---

### 🔁 **Approval Workflow Example**

```
[Engineer Submits Schedule] --> [Status: SUBMITTED]
       |
       V
[Engineer Requests Edit] --> [Status: PENDING EDIT APPROVAL]
       |
       V
[Team Leader Reviews Edit]
    ├── Approves --> Schedule Updated → Status: APPROVED
    └── Rejects  --> Status: REJECTED
```

---

### ⚠️ **Important Rules**:

- Team Leader can **only access and manage** schedules of their assigned group.
- Team Leader’s own schedule change requires **approval by higher role** (e.g., **Coordinator** or **Management**).
- Can only approve or reject **edit requests** for team members.
- Cannot create or submit a schedule on behalf of team members unless explicitly allowed by policy/system config.

---

================================================================

---

# 🧑‍💼 **Coordinator User – Schedule Management Workflow**

### 🔹 **Purpose**:

The **Coordinator** is a centralized, office-based role responsible for:

- **Overseeing schedule edit requests across all teams** (when Team Leads are unavailable or during escalation).
- Acting as a **backup approver** for all teams’ schedules.
- Also functions as an **Engineer**, so can **create and manage their own schedule** like any regular user.

---

### 🧭 **Role in Hierarchy**:

```plaintext
ENGINEER → TEAMLEAD → COORDINATOR → ADMIN → MANAGEMENT → SYSTEM
```

- The Coordinator sits **between Team Leads and Admin**.
- Has **cross-team access** — unlike Team Leads who only handle their own group.

---

### ✅ **Permissions Summary**:

| Action                                                  | Permission                             |
| ------------------------------------------------------- | -------------------------------------- |
| Create own schedule                                     | ✅ Allowed                             |
| View own schedule                                       | ✅ Allowed                             |
| Edit own schedule (with approval)                       | ⚠️ Requires Admin or higher approval   |
| View schedules of all teams                             | ✅ Allowed                             |
| Approve/reject schedule edit requests (all teams)       | ✅ Allowed                             |
| Edit team members' schedules (when Team Lead is absent) | ✅ Allowed                             |
| Override rejected edit requests (optional config)       | 🔄 Optional (based on system settings) |
| Approve own requests                                    | ❌ Not allowed                         |
| Access system config menus                              | ❌ Not allowed (System role only)      |

---

### 📝 **Workflow Details**

#### **1. Own Schedule Management (As Engineer)**:

- Coordinator logs in like a standard user.
- Can **create their own schedule** via the **Manage Schedule** tab.
- If edits are requested later, the request follows the next role (Admin or Manager) for approval.

---

#### **2. Monitor and Manage Edit Requests (All Teams)**:

- Navigates to **“Edit Requests”** or **“Pending Approvals”** section.
- Sees **pending edit requests** across all groups, especially:

  - From Engineers whose Team Leads are unavailable.
  - When Team Lead escalates a complex or unresolved edit request.

- For each edit request:

  - Can view **before/after** data.
  - **Approve** → Schedule is updated in DB; status = `APPROVED`.
  - **Reject** → Schedule remains unchanged; status = `REJECTED`.

---

#### **3. Team Leader Substitution (Backup Mode)**:

- If a **Team Leader is on leave** or marked as inactive, Coordinator steps in as **interim Team Lead**:

  - Gains temporary edit/approval rights over that group.
  - Can update or approve any team member's schedule.

> This can be managed using a flag like: `teamlead_override = true` during team leader absence.

---

#### **4. Full Team Schedule View**:

- Coordinator can view the **schedules of all teams and groups** in a unified table or dashboard.
- Can filter by:

  - Date range
  - Team / Group No.
  - Role (Engineer / TeamLead)
  - Status (Submitted, Pending, Approved, etc.)

---

#### **5. Escalation Management**:

- Any **conflicts**, **unresolved schedule edits**, or **overdue entries** are visible to Coordinator.
- Can:

  - Notify users or Team Leads.
  - Take action if deadlines are missed.

---

### 📊 **Coordinator Tabs / Views**:

| Tab Name                             | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| **Dashboard**                        | Summary of all schedules, pending requests, alerts.     |
| **Manage Schedule**                  | Create/view/edit own schedule.                          |
| **All Team Schedules**               | Full access to all teams' schedules.                    |
| **Edit Requests**                    | Approve/reject any pending edit requests.               |
| **TeamLead Substitution** (optional) | Temporary access to specific team if TL is unavailable. |

---

### 🔁 **Workflow Example: Engineer Edit Request (TL on Leave)**

```
[Engineer Submits Schedule] → Status: SUBMITTED
       ↓
[Engineer Requests Edit] → Status: PENDING EDIT APPROVAL
       ↓
[Team Lead is on Leave]
       ↓
[Coordinator Reviews]
    ├─ Approve → Schedule Updated → Status: APPROVED
    └─ Reject  → Status: REJECTED
```

---

### 🔒 **Access Control Highlights**:

- Coordinator cannot approve **their own schedule edits**.
- Cannot change or assign system-level permissions (System role only).
- Can act on **any team’s schedules**, but actions are logged with audit trails.

---

### 🛡️ **Audit / Compliance Notes**:

- All coordinator actions should be auditable:

  - Who approved/rejected
  - Timestamp of action
  - Affected employee ID and group

- Optional note input required on rejection/approval (configurable).

---

=====================================================

---

---

---

# 👨‍💼 **Admin User (Manager) – Schedule Management Workflow**

### 🔹 **Purpose**:

The **Admin** role represents the **Manager** of all teams and is responsible for:

- Overseeing the entire schedule approval pipeline.
- Reviewing finalized schedules from Coordinators and Team Leads.
- Performing final corrections or interventions if needed.
- Monitoring scheduling health, compliance, and analytics.

---

### 🧭 **Position in Workflow Hierarchy**:

```plaintext
ENGINEER → TEAMLEAD → COORDINATOR → ADMIN → MANAGEMENT → SYSTEM
```

- Admin comes **after Coordinator**, and has **authority over all schedule data** from every group.
- Acts as a **final reviewer/approver** before schedule reports reach **Management**.

---

### ✅ **Permissions Summary**:

| Action                                                 | Permission                        |
| ------------------------------------------------------ | --------------------------------- |
| Create and manage own schedule                         | ✅ Allowed                        |
| View and edit any team schedule                        | ✅ Full Access                    |
| View all schedule statuses (all roles)                 | ✅ Allowed                        |
| Final approval of schedule edits (across org)          | ✅ Allowed                        |
| Reject or return submitted schedules (all teams)       | ✅ Allowed                        |
| Assign or reassign Team Leads (optional system config) | 🔄 Optional                       |
| View org-wide analytics and compliance                 | ✅ Allowed                        |
| Change system-level config                             | ❌ Not allowed (System role only) |

---

### 📝 **Workflow Details**

#### **1. Own Schedule Entry**:

- Admin (Manager) still has their own schedule and must submit it like any Engineer.
- If edited, **Coordinator or higher** must approve (if enforced strictly).

---

#### **2. Review Team Schedules**:

- Admin sees **all team schedules across all groups**.
- Filters and sorts by:

  - Team / Group
  - Status (Submitted, Pending Edit, Approved, etc.)
  - Role (Engineer, TeamLead, Coordinator)
  - Date

---

#### **3. Handle Escalated Edit Requests**:

- When a **Coordinator** escalates or skips approval:

  - Admin can step in to approve/reject the request.
  - Final status is set to `APPROVED_BY_ADMIN`.

---

#### **4. Return or Correct Incorrect Entries**:

- Admin can:

  - **Reject schedules** that were incorrectly filled.
  - Request additional notes or clarification.
  - **Send notifications** to Team Leads or Coordinators for corrections.

---

#### **5. Review Reports & Dashboard Analytics**:

- Admin has access to:

  - Team-wise submission stats
  - Schedule compliance metrics
  - Schedule category breakdowns (e.g. WFH, Site, Leave, etc.)
  - Charts showing late submissions, edit trends, etc.

---

### 📊 **Admin Tabs / Views**:

| Tab Name                 | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| **Dashboard**            | Overview of org-wide schedule data and KPIs.         |
| **All Team Schedules**   | View and manage schedules from all users.            |
| **Edit Request Review**  | Review and finalize edit requests.                   |
| **Schedule Corrections** | Modify/reject incorrect or policy-violating entries. |
| **Reports & Analytics**  | Exportable team-wise and org-wide reports.           |

---

### 🔁 **Workflow Sample: Final Review Path**

```
[Engineer Submits Schedule]
       ↓
[TeamLead Reviews/Edit]
       ↓
[Coordinator Reviews]
       ↓
[Admin Final Approval & Corrections] → Status: FINALIZED
```

---

### 🔒 **Access Control Notes**:

- Admin cannot alter **System Configuration** (menus, RBAC, UI) — only **System Role** can.
- Should not approve their own edits (must go to Management or System).
- Should not bypass Coordinator unless role escalation logic permits.

---

### 🛡️ **Audit Trail (Mandatory)**:

- Every change or override made by Admin must be tracked:

  - Action type
  - Timestamp
  - Target user and group
  - Reason (optional but configurable as required)

---

---

---

Great — let's continue with the next role in your hierarchy:

---

# 👨‍💼 **Admin User (Manager) – Schedule Management Workflow**

### 🔹 **Purpose**:

The **Admin** role represents the **Manager** of all teams and is responsible for:

- Overseeing the entire schedule approval pipeline.
- Reviewing finalized schedules from Coordinators and Team Leads.
- Performing final corrections or interventions if needed.
- Monitoring scheduling health, compliance, and analytics.

---

### 🧭 **Position in Workflow Hierarchy**:

```plaintext
ENGINEER → TEAMLEAD → COORDINATOR → ADMIN → MANAGEMENT → SYSTEM
```

- Admin comes **after Coordinator**, and has **authority over all schedule data** from every group.
- Acts as a **final reviewer/approver** before schedule reports reach **Management**.

---

### ✅ **Permissions Summary**:

| Action                                                 | Permission                        |
| ------------------------------------------------------ | --------------------------------- |
| Create and manage own schedule                         | ✅ Allowed                        |
| View and edit any team schedule                        | ✅ Full Access                    |
| View all schedule statuses (all roles)                 | ✅ Allowed                        |
| Final approval of schedule edits (across org)          | ✅ Allowed                        |
| Reject or return submitted schedules (all teams)       | ✅ Allowed                        |
| Assign or reassign Team Leads (optional system config) | 🔄 Optional                       |
| View org-wide analytics and compliance                 | ✅ Allowed                        |
| Change system-level config                             | ❌ Not allowed (System role only) |

---

### 📝 **Workflow Details**

#### **1. Own Schedule Entry**:

- Admin (Manager) still has their own schedule and must submit it like any Engineer.
- If edited, **Coordinator or higher** must approve (if enforced strictly).

---

#### **2. Review Team Schedules**:

- Admin sees **all team schedules across all groups**.
- Filters and sorts by:

  - Team / Group
  - Status (Submitted, Pending Edit, Approved, etc.)
  - Role (Engineer, TeamLead, Coordinator)
  - Date

---

#### **3. Handle Escalated Edit Requests**:

- When a **Coordinator** escalates or skips approval:

  - Admin can step in to approve/reject the request.
  - Final status is set to `APPROVED_BY_ADMIN`.

---

#### **4. Return or Correct Incorrect Entries**:

- Admin can:

  - **Reject schedules** that were incorrectly filled.
  - Request additional notes or clarification.
  - **Send notifications** to Team Leads or Coordinators for corrections.

---

#### **5. Review Reports & Dashboard Analytics**:

- Admin has access to:

  - Team-wise submission stats
  - Schedule compliance metrics
  - Schedule category breakdowns (e.g. WFH, Site, Leave, etc.)
  - Charts showing late submissions, edit trends, etc.

---

### 📊 **Admin Tabs / Views**:

| Tab Name                 | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| **Dashboard**            | Overview of org-wide schedule data and KPIs.         |
| **All Team Schedules**   | View and manage schedules from all users.            |
| **Edit Request Review**  | Review and finalize edit requests.                   |
| **Schedule Corrections** | Modify/reject incorrect or policy-violating entries. |
| **Reports & Analytics**  | Exportable team-wise and org-wide reports.           |

---

### 🔁 **Workflow Sample: Final Review Path**

```
[Engineer Submits Schedule]
       ↓
[TeamLead Reviews/Edit]
       ↓
[Coordinator Reviews]
       ↓
[Admin Final Approval & Corrections] → Status: FINALIZED
```

---

### 🔒 **Access Control Notes**:

- Admin cannot alter **System Configuration** (menus, RBAC, UI) — only **System Role** can.
- Should not approve their own edits (must go to Management or System).
- Should not bypass Coordinator unless role escalation logic permits.

---

### 🛡️ **Audit Trail (Mandatory)**:

- Every change or override made by Admin must be tracked:

  - Action type
  - Timestamp
  - Target user and group
  - Reason (optional but configurable as required)

---

---

# **Schedule Management Workflow** for the **Management Role**

---

##🧑‍💼 **Management User – Schedule Management Workflow**

### 🔹 **Purpose**:

The **Management** role represents **Heads of Department (HODs)** or upper leadership who:

- **Oversee** the complete scheduling operation across the company.
- **Monitor** compliance, work allocation, and productivity across teams.
- **Do not directly approve** daily schedule requests.
- **Do not create** their own schedules in most setups (read-only role for operations).

Their view is high-level: analytics, summary data, team performance.

---

### 🧭 **Position in Workflow Hierarchy**:

```plaintext
ENGINEER → TEAMLEAD → COORDINATOR → ADMIN → MANAGEMENT → SYSTEM
```

- Management sits **above Admin**, primarily for **strategic insight and reporting**.
- May request policy changes but doesn’t participate in actual scheduling tasks.

---

### ✅ **Permissions Summary**:

| Action                                         | Permission                  |
| ---------------------------------------------- | --------------------------- |
| View schedules across all roles/teams          | ✅ Allowed                  |
| View edit request history and audit trails     | ✅ Allowed                  |
| View team performance and scheduling metrics   | ✅ Allowed                  |
| Create or edit schedules                       | ❌ Not allowed              |
| Approve/reject schedules                       | ❌ Not allowed              |
| Submit personal schedule                       | ❌ Not applicable (usually) |
| Export team and department-level reports       | ✅ Allowed                  |
| View compliance issues (late, skipped entries) | ✅ Allowed                  |
| View workload distribution by role or category | ✅ Allowed                  |

---

### 🧾 **Workflow Responsibilities**

#### **1. Company-Wide Schedule Visibility**:

- View **schedules of all employees**, filtered by:

  - Group / Team
  - Role
  - Date / Range
  - Location type (Site, WFH, Leave, etc.)

#### **2. Monitor Scheduling Health**:

- Can access dashboards showing:

  - % of schedules submitted on time
  - # of edit requests pending/approved/rejected
  - Days with lower activity or overload
  - Which teams are missing entries

#### **3. Strategic Review**:

- Reviews:

  - Resource utilization (chargeable vs. non-chargeable)
  - Location trends (how often engineers go to site vs WFH)
  - Approval timelines (how long requests stay pending)

#### **4. Reports & Exporting**:

- Can **export CSV / Excel / PDF** reports for:

  - Monthly team productivity
  - Daily schedule breakdowns
  - Schedule compliance by TeamLead

- Option to **schedule reports via email** or export automatically.

---

### 📊 **Management Tabs / Views**:

| Tab Name                 | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| **Executive Dashboard**  | High-level graphs, team KPIs, and summary cards.         |
| **Team Schedule Viewer** | Read-only view of all team schedules.                    |
| **Compliance Tracker**   | Flags late or missing schedule entries.                  |
| **Analytics**            | Resource allocation, approval timelines, location usage. |
| **Reports**              | Generate/export historical and current scheduling data.  |

---

### 📈 Sample Metrics Visible to Management:

| Metric                              | Example                        |
| ----------------------------------- | ------------------------------ |
| Schedule Submission Rate            | 94% on-time for last 7 days    |
| Most Active Work Category           | Site: Commissioning (38%)      |
| Team with Most Edit Requests        | Group 4 (28 edits this week)   |
| Pending Approvals (TL/Coordinator)  | 12 total, avg. delay 3.2 hours |
| Top 5 Engineers by Chargeable Hours | Engineer A, B, C...            |

---

### 🔒 **Access Control Notes**:

- **Management cannot make changes** to schedules, users, or approval chains.
- May **flag anomalies** or submit feedback to Admin/System, but no direct control.
- All access is **read-only** for compliance and data security.

---

### 🔁 Example Use Case: Compliance Oversight

```
Management opens dashboard →
   Sees 5 teams have missing schedule entries for the past 2 days →
   Downloads report →
   Flags TeamLead via internal note or report escalation →
   Coordinator/Admin follows up
```

---

### 🧠 Strategic Benefit of Management Role:

- Detects systemic issues: e.g. chronic under-reporting from certain teams.
- Justifies manpower adjustments: if site visits are too frequent or lopsided.
- Guides training needs: based on work category volume (e.g. too many FATs may suggest product knowledge gaps).

---

---

---

---

# 🧑‍💻 **System User – Schedule Management Workflow & Responsibilities**

### 🔹 **Purpose**:

The **System** role is a **developer/system admin role** responsible for:

- Managing **technical configurations**, **permission structures**, and **application settings**.
- Overseeing **Role-Based Access Control (RBAC)** logic.
- Controlling **UI-level permissions** (like sidebar visibility).
- Assisting in escalations by **manually correcting DB-level or logic-level issues**.
- Does **not** participate in day-to-day scheduling like engineers or managers (though can view or simulate all roles for testing/debugging).

---

### 🧭 **Position in Workflow Hierarchy**:

```plaintext
ENGINEER → TEAMLEAD → COORDINATOR → ADMIN → MANAGEMENT → SYSTEM
```

- The **System** role sits **outside** the operational hierarchy.
- It’s not a "manager" role but rather a **technical maintainer/operator**.

---

### ✅ **Permissions Summary**:

| Action                                                | Permission            |
| ----------------------------------------------------- | --------------------- |
| View all schedule data (read-only or debug mode)      | ✅ Allowed            |
| Access all roles’ dashboards (for testing/simulation) | ✅ Allowed            |
| Modify sidebar/menu options per role                  | ✅ Allowed            |
| Manage RBAC (add/remove/modify role permissions)      | ✅ Allowed            |
| Configure visibility of tabs, routes, modals by role  | ✅ Allowed            |
| Debug logic or override stuck workflows               | ✅ Allowed            |
| Submit own schedule (optional for test users)         | ⚠️ Optional/Test-Only |
| Approve production schedule entries                   | ❌ Not permitted      |
| Participate in business-level approval chains         | ❌ Not permitted      |

---

### 🛠️ **Key Responsibilities**

#### **1. Role-Based UI Control (Sidebar & Routes)**:

- System User manages what **each role sees** in the frontend:

  - Sidebar menus
  - Tabs/pages
  - Buttons (e.g. “Approve”, “Edit”)

- Maintains route access like:

  ```
  /engineer, /teamlead, /coordinator, /admin, /management
  ```

  Based on logged-in role.

#### **2. Role & Permission Mapping (RBAC Engine)**:

- Define which roles can:

  - Create/edit/approve schedules
  - View team data
  - Access analytics
  - Approve on behalf of other roles (override logic)

#### **3. System Configuration Management**:

- Manage system-level configurations like:

  - Default values (e.g. tomorrow’s date)
  - Status mapping (SUBMITTED, APPROVED, etc.)
  - Approval escalation rules
  - Master Data (Work Categories, Location Options, etc.)

#### **4. Debugging & Overrides**:

- Can:

  - Inspect edit request chains
  - Manually correct schedule statuses stuck in approval
  - Unlock records blocked by logic errors

> These actions should leave **audit logs** to avoid silent overrides.

---

### 🧪 **Optional: Simulation/Impersonation Mode**

- System users may use a **role simulation tool**:

  - Switch view as ENGINEER, TEAMLEAD, etc. for testing.
  - Helps QA/debug permission errors or UI glitches.

---

### 🔒 **Security Best Practices**:

- All actions taken by **System** role must:

  - Be logged with full metadata (IP, timestamp, user ID).
  - Require a reason/comment if a change is made to production data.
  - Be visible in an audit dashboard (internal only).

---

### 📊 **System Role Interface (Typical Tabs)**:

| Tab / Section           | Description                                               |
| ----------------------- | --------------------------------------------------------- |
| **RBAC Manager**        | Add/remove role-based permissions.                        |
| **UI Configurator**     | Control which menu/tab/button is visible to each role.    |
| **Route Manager**       | Define accessible routes for each role.                   |
| **Master Data Manager** | Maintain work categories, locations, etc.                 |
| **Audit Logs**          | See history of overrides or critical changes.             |
| **Debug Tools**         | Manually inspect stuck workflows or simulate roles.       |
| **System Settings**     | Config-level toggles: e.g. default date, edit lock rules. |

---

### 🔁 Example Use Case: Schedule Edit Issue

```
An Engineer's edit request is stuck in PENDING state due to a missing team lead.
       ↓
Coordinator cannot approve due to a bug in escalation logic.
       ↓
System User:
   - Logs into the Debug Panel.
   - Inspects the workflow state and approver chain.
   - Manually assigns the Coordinator as fallback approver or unlocks the entry.
       ↓
Record updated → Audit log saved → Workflow resumes
```

---

---

---

# RBAC

## ✅ 1. **RBAC Matrix – CRUD Permissions by Role**

This matrix shows who can **Create, Read, Update, and Approve** schedule-related data per role.

| Role            | Create Own Schedule | Read Own Schedule | Read Team Schedules | Edit Own Schedule | Edit Team Schedule     | Approve Edit Requests | View All Teams | View Analytics | Manage Roles/UI         |
| --------------- | ------------------- | ----------------- | ------------------- | ----------------- | ---------------------- | --------------------- | -------------- | -------------- | ----------------------- |
| **Engineer**    | ✅ Yes              | ✅ Yes            | ✅ (Read-only)      | ⚠️ Request-based  | ❌ No                  | ❌ No                 | ❌ No          | ❌ No          | ❌ No                   |
| **TeamLead**    | ✅ Yes              | ✅ Yes            | ✅ (Own Group only) | ⚠️ Request-based  | ✅ Own Group only      | ✅ (Own Group)        | ❌ No          | ⚠️ Limited     | ❌ No                   |
| **Coordinator** | ✅ Yes              | ✅ Yes            | ✅ All Groups       | ⚠️ Request-based  | ✅ When TL unavailable | ✅ All Groups         | ✅ Yes         | ✅ Yes         | ❌ No                   |
| **Admin**       | ✅ Yes              | ✅ Yes            | ✅ All Teams        | ✅ Yes            | ✅ All Teams           | ✅ All Teams          | ✅ Yes         | ✅ Yes         | ⚠️ (Limited if allowed) |
| **Management**  | ❌ No               | ❌ No             | ✅ All Teams        | ❌ No             | ❌ No                  | ❌ No                 | ✅ Yes         | ✅ Full        | ❌ No                   |
| **System**      | ⚠️ Optional/Test    | ✅ All            | ✅ All              | ✅ For Debug      | ✅ For Debug           | ⚠️ Override only      | ✅ Yes         | ✅ Full        | ✅ Full Control         |

---

## 🔁 2. **Workflow Diagram – Schedule Approval Flow**

Here's a textual flow showing how a schedule moves from submission to finalization:

```plaintext
[Engineer]
   └──> Submits Schedule
        └──> [Status: SUBMITTED]

If Edit Requested:
   └──> [Edit Request Created]
        └──> [Status: PENDING EDIT APPROVAL]

          └──> [TeamLead Reviews]
                ├── Approve → DB Updated → Status: APPROVED
                └── Reject → Status: REJECTED

If TeamLead Absent:
   └──> [Coordinator Reviews]
        ├── Approve → Status: APPROVED_BY_COORDINATOR
        └── Reject → Status: REJECTED_BY_COORDINATOR

Final Review:
   └──> [Admin (Manager)]
        └── View/Edit/Correct → Status: FINALIZED

Monitoring:
   └──> [Management Views] → Dashboard + Analytics (No Edits)
   └──> [System Oversees] → Audit, Overrides, UI Config
```

---

## 🧱 3. **UI Wireframe Suggestions (Per Role)**

### 🔹 **Engineer Dashboard**

- 📆 My Schedules (List + Summary Cards)
- ➕ New Schedule Modal
- 🔍 Team Schedules (View-Only)
- 🔄 Edit Request History

### 🔹 **TeamLead Dashboard**

- Everything Engineer has, plus:
- 📁 My Team’s Schedules
- ✏️ Edit Requests Panel (Approve/Reject)
- 📈 Team Submission Tracker

### 🔹 **Coordinator Dashboard**

- 🔍 Global Team Schedule Viewer
- ✅ Approval Queue (Multi-group)
- 🔁 TeamLead Substitution Tool
- 📄 Daily Escalation Feed

### 🔹 **Admin Dashboard**

- 🧾 All Schedules Overview (CRUD)
- 🕵️‍♂️ Edit History & Overrides
- 📈 Team Analytics & Compliance
- 📤 Export Reports

### 🔹 **Management Dashboard**

- 📊 Org-Wide Schedule Analytics
- ⚠️ Compliance Alerts (Missed Entries, Overloads)
- 🧮 Workload Distribution
- 📥 Export Data (Monthly/Weekly)

### 🔹 **System Dashboard**

- 🧩 RBAC Matrix Editor
- 🎛️ UI/Sidebar Configurator
- 🐞 Debug/Edit Logs Panel
- 🗂️ Master Data Manager (Work Categories, Locations)

---
