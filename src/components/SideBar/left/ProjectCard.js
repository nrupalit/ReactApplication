import React, { Component } from 'react';
import SidebarCard from './SidebarCard'

export default class ProjectCard extends Component {
  state = {
    projectData: [
      { project_id: '215' },
      { project_id: '10' },
    ],
    toggle: true
  }

  toggleDropdown = () => {
    this.setState({
      toggle: !this.state.toggle
    })
  }

  removeProject = () => {
    this.props.unDockProject();
    this.props.undockTheProject();
    this.props.history.push("/my_projects")
  }
  render() {
    return (
      <>
        <SidebarCard
          template={this.props.template}
          projectData={this.props.project}
          toggleDropdown={this.toggleDropdown}
          toggle={this.state.toggle}
          removeProject={this.removeProject}
          history={this.props.history}

        />
      </>
    )
  }
}
