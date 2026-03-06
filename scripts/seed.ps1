$URL  = "https://ep-cool-smoke-a7t2dty0.ap-southeast-2.aws.neon.tech/sql"
$CONN = "postgresql://neondb_owner:npg_S0IfLJlwv2sq@ep-cool-smoke-a7t2dty0.ap-southeast-2.aws.neon.tech/neondb?sslmode=require"

function Invoke-SQL($query, $params = @()) {
    $body = @{ query = $query; params = $params } | ConvertTo-Json -Depth 20 -Compress
    try {
        $r = Invoke-RestMethod -Uri $URL -Method POST -Body $body -ContentType "application/json" -Headers @{"Neon-Connection-String" = $CONN}
        Write-Host "OK  $($query.Substring(0, [Math]::Min(60,$query.Length)))..."
    } catch {
        $err = $_.ErrorDetails.Message | ConvertFrom-Json -ErrorAction SilentlyContinue
        Write-Host "ERR $($query.Substring(0, [Math]::Min(60,$query.Length)))... => $($err.message)"
    }
}

# ── Acme Corp data ───────────────────────────────────────────────────────────
$b1 = @{
  plan = @{
    coreValues = @(
      @{id=1;title="Integrity First";desc="We do what we say, always."},
      @{id=2;title="Customer Obsession";desc="Every decision starts with the customer."},
      @{id=3;title="Relentless Improvement";desc="Better every single day."}
    )
    purpose = "Empowering businesses to scale with confidence"
    niche   = "B2B SaaS for mid-market companies"
    bhag    = @{goal="Become the #1 SMB operating platform globally";date="2035-01-01";narrative="A world where every small business has enterprise-grade tools."}
    threeYear = @{date="2028-01-01";revenue='$20M';profit='$4M';measurables=@(@{id=1;label="Customers";value="500+"},@{id=2;label="Team Size";value="80+"},@{id=3;label="NPS";value="72+"});possibilities=@("Expand to APAC","Launch mobile app","Strategic acquisition")}
    oneYear   = @{date="2026-01-01";revenue='$8M';profit='$1.2M';measurables=@(@{id=1;label="ARR";value='$8M'},@{id=2;label="Headcount";value="40"});goals=@("Hire VP of Sales","Launch v3 platform","Expand to 3 new verticals","Achieve SOC 2 compliance")}
    quarterly = @{date="2025-06-30";revenue='$2M';profit='$300K';measurables=@(@{id=1;label="New MRR";value='$150K'},@{id=2;label="Churn";value="<2%"});goal="Nail the enterprise pilot program with 5 anchor clients"}
    longTermIssues = @(@{id=1;title="Pricing model needs revision for enterprise tier";owner="Sarah Mitchell"},@{id=2;title="Engineering hiring pipeline is too slow";owner="James Chen"})
  }
  orgChart = @{seats=@(
    @{id="s1";title="Visionary / CEO";    person="Sarah Mitchell";accountabilities=@("Company vision","Culture","Key relationships");parentId=$null},
    @{id="s2";title="Integrator / COO";   person="James Chen";    accountabilities=@("P&L","Team accountability","Remove obstacles");parentId="s1"},
    @{id="s3";title="Head of Sales";      person="Open";          accountabilities=@("Revenue targets","Pipeline","Customer acquisition");parentId="s2"},
    @{id="s4";title="Head of Engineering";person="Lisa Wong";     accountabilities=@("Product delivery","Tech roadmap","Team hiring");parentId="s2"},
    @{id="s5";title="Head of Finance";    person="Open";          accountabilities=@("Budgeting","Reporting","Cash flow");parentId="s2"}
  )}
  rocks = @(
    @{id=1;title="Launch Q2 marketing campaign";owner="Sarah Mitchell";dueDate="2025-06-30";status="on-track"; progress=65;milestones=@(@{id=1;text="Brief agency";done=$true},@{id=2;text="Approve creative";done=$true},@{id=3;text="Go live";done=$false})},
    @{id=2;title="Hire 2 senior engineers";     owner="James Chen";   dueDate="2025-06-30";status="off-track";progress=20;milestones=@(@{id=1;text="Post JDs";done=$true},@{id=2;text="First round interviews";done=$false},@{id=3;text="Offers out";done=$false})},
    @{id=3;title="Complete CRM migration";      owner="Lisa Wong";    dueDate="2025-06-30";status="on-track"; progress=80;milestones=@(@{id=1;text="Data audit";done=$true},@{id=2;text="Migration script";done=$true},@{id=3;text="UAT";done=$false})}
  )
  scorecard = @(
    @{id=1;metric="Weekly Revenue";owner="Sarah Mitchell";goal="45000";goalType="min";freq="weekly"; values=@(@{wk="Mar 1";v=42000},@{wk="Mar 8";v=47000},@{wk="Mar 15";v=44000},@{wk="Mar 22";v=51000},@{wk="Mar 29";v=48000},@{wk="Apr 5";v=52000})},
    @{id=2;metric="New Leads";     owner="James Chen";   goal="25";   goalType="min";freq="weekly"; values=@(@{wk="Mar 1";v=18},@{wk="Mar 8";v=22},@{wk="Mar 15";v=19},@{wk="Mar 22";v=28},@{wk="Mar 29";v=24},@{wk="Apr 5";v=31})},
    @{id=3;metric="Churn Rate %";  owner="Lisa Wong";    goal="2";    goalType="max";freq="monthly";values=@(@{wk="Jan";v=3.1},@{wk="Feb";v=2.8},@{wk="Mar";v=2.5},@{wk="Apr";v=2.2})}
  )
  issues = @(
    @{id=1;title="Sales process inconsistency across reps";   priority="high";  owner="Sarah Mitchell";status="open";  date="2025-03-01";type="short"},
    @{id=2;title="CRM data not being updated regularly";      priority="medium";owner="James Chen";   status="open";  date="2025-02-28";type="short"},
    @{id=3;title="Brand refresh needed for enterprise market";priority="low";   owner="Sarah Mitchell";status="solved";date="2025-02-10";type="short"}
  )
  todos = @(
    @{id=1;title="Send Q1 report to board";                    owner="Sarah Mitchell";dueDate="2025-03-10";done=$false},
    @{id=2;title="Review job descriptions for engineering roles";owner="James Chen";  dueDate="2025-03-08";done=$true},
    @{id=3;title="Schedule all-hands meeting";                 owner="Sarah Mitchell";dueDate="2025-03-12";done=$false}
  )
  headlines = @(
    @{id=1;owner="Sarah Mitchell";text="Won Apex deal — `$120K ARR!";              date="2025-03-05"},
    @{id=2;owner="James Chen";    text="Engineering team completed sprint 14 two days early";date="2025-03-04"}
  )
  meetingNotes = @(@{id=1;date="2025-02-26";type="L10";attendees="Full leadership team";segue="Q2 feels exciting";headlines="Won Apex deal";rocks="2/3 on track";issues="CRM adoption bottleneck";todos="James to audit CRM by Friday";rating=8;emailSent=$false})
  rprs = @(
    @{id=1;employee="Sarah Mitchell";seat="Visionary / CEO";    getsIt=$true;wantsIt=$true;hasCapacity=$true; cvFit=5;notes="Founding visionary, sets the tone."},
    @{id=2;employee="James Chen";    seat="Integrator / COO";   getsIt=$true;wantsIt=$true;hasCapacity=$false;cvFit=4;notes="Strong integrator, slightly overloaded."},
    @{id=3;employee="Lisa Wong";     seat="Head of Engineering"; getsIt=$true;wantsIt=$true;hasCapacity=$true; cvFit=5;notes="Technical excellence, great culture fit."}
  )
  oneOnOnes    = @(@{id=1;employee="James Chen";manager="Sarah Mitchell";date="2025-03-01";quarter="Q1 2025";highlights="Strong quarter overall";challenges="Capacity constraints slowing hiring";goals="Complete 2 key hires by end of Q2";rating=4;archived=$false})
  notifications = @()
}

# ── Vertex Solutions data ────────────────────────────────────────────────────
$b2 = @{
  plan = @{
    coreValues = @(@{id=1;title="Transparency";desc="Radical honesty, always."},@{id=2;title="Speed";desc="Move fast, iterate faster."},@{id=3;title="Excellence";desc="Never good enough until it's great."})
    purpose = "Connecting talent with opportunity at scale"
    niche   = "HR tech for distributed teams"
    bhag    = @{goal="The LinkedIn for distributed workforce management";date="2034-01-01";narrative="Every remote company runs on Vertex."}
    threeYear = @{date="2028-01-01";revenue='$12M';profit='$2M';measurables=@(@{id=1;label="Customers";value="1,000+"},@{id=2;label="Team";value="50+"});possibilities=@("Launch in EU","Acquire competitor","Go public")}
    oneYear   = @{date="2026-01-01";revenue='$1.5M';profit='$200K';measurables=@(@{id=1;label="ARR";value='$1.5M'});goals=@("Close Series A","Hire VP Engineering","Launch EU expansion")}
    quarterly = @{date="2025-06-30";revenue='$350K';profit='$50K';measurables=@(@{id=1;label="New Logos";value="20"});goal="Close Series A and sign first enterprise deal"}
    longTermIssues = @(@{id=1;title="Product-market fit in EU still unclear";owner="James Turner"})
  }
  orgChart = @{seats=@(
    @{id="s1";title="CEO / Founder";person="James Turner";accountabilities=@("Vision","Fundraising","Strategy");parentId=$null},
    @{id="s2";title="Head of CS";   person="Amy Lee";     accountabilities=@("Customer success","Retention","Onboarding");parentId="s1"}
  )}
  rocks = @(
    @{id=1;title="Close Series A";owner="James Turner";dueDate="2025-06-30";status="on-track";progress=55;milestones=@()},
    @{id=2;title="Build CS team"; owner="Amy Lee";     dueDate="2025-06-30";status="on-track";progress=40;milestones=@()}
  )
  scorecard    = @(@{id=1;metric="MRR";owner="James Turner";goal="120000";goalType="min";freq="monthly";values=@(@{wk="Jan";v=98000},@{wk="Feb";v=103000},@{wk="Mar";v=108000},@{wk="Apr";v=121000})})
  issues       = @(@{id=1;title="Investor deck needs refreshing";priority="high";owner="James Turner";status="open";date="2025-03-01";type="short"})
  todos        = @(@{id=1;title="Prepare pitch deck v4";owner="James Turner";dueDate="2025-03-15";done=$false},@{id=2;title="Draft CS playbook";owner="Amy Lee";dueDate="2025-03-20";done=$false})
  headlines    = @(); meetingNotes = @(); rprs = @(); oneOnOnes = @(); notifications = @()
}

Write-Host "Seeding businesses..."
Invoke-SQL "INSERT INTO businesses (id,company,industry,color,data) VALUES (`$1,`$2,`$3,`$4,`$5::jsonb) ON CONFLICT (id) DO NOTHING" @("b1","Acme Corp","B2B SaaS","#7a9e7e",($b1|ConvertTo-Json -Depth 20 -Compress))
Invoke-SQL "INSERT INTO businesses (id,company,industry,color,data) VALUES (`$1,`$2,`$3,`$4,`$5::jsonb) ON CONFLICT (id) DO NOTHING" @("b2","Vertex Solutions","HR Tech","#c9a84c",($b2|ConvertTo-Json -Depth 20 -Compress))

Write-Host "Seeding users..."
Invoke-SQL "INSERT INTO users (id,business_id,name,email,username,password,role) VALUES (`$1,`$2,`$3,`$4,`$5,`$6,`$7) ON CONFLICT (username) DO NOTHING" @("b1-u1","b1","Sarah Mitchell","sarah@acme.com","sarah.acme","acme123","owner")
Invoke-SQL "INSERT INTO users (id,business_id,name,email,username,password,role) VALUES (`$1,`$2,`$3,`$4,`$5,`$6,`$7) ON CONFLICT (username) DO NOTHING" @("b1-u2","b1","James Chen","james@acme.com","james.acme","acme456","member")
Invoke-SQL "INSERT INTO users (id,business_id,name,email,username,password,role) VALUES (`$1,`$2,`$3,`$4,`$5,`$6,`$7) ON CONFLICT (username) DO NOTHING" @("b1-u3","b1","Lisa Wong","lisa@acme.com","lisa.acme","acme789","member")
Invoke-SQL "INSERT INTO users (id,business_id,name,email,username,password,role) VALUES (`$1,`$2,`$3,`$4,`$5,`$6,`$7) ON CONFLICT (username) DO NOTHING" @("b2-u1","b2","James Turner","james@vertex.com","james.vertex","vertex123","owner")
Invoke-SQL "INSERT INTO users (id,business_id,name,email,username,password,role) VALUES (`$1,`$2,`$3,`$4,`$5,`$6,`$7) ON CONFLICT (username) DO NOTHING" @("b2-u2","b2","Amy Lee","amy@vertex.com","amy.vertex","vertex456","member")

Write-Host "`nDone! Verifying row counts..."
Invoke-SQL "SELECT COUNT(*) FROM businesses"
Invoke-SQL "SELECT COUNT(*) FROM users"
